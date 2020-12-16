import React, { useEffect, useState } from 'react';

import { validate } from '../../Utils/validation';

import './MultiStepForm.css';

interface MultiStepFormProps {
  children: JSX.Element[];
  values: {
    [key: string]: string | boolean;
  };
  touchedValues: {
    [key: string]: boolean;
  };
  valueErrors: {
    [key: string]: string;
  };
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  children,
  values,
  touchedValues,
  valueErrors,
}) => {
  const [formData, setFormData] = useState({
    ...values
  });
  const [touched, setTouched] = useState({
    ...touchedValues,
  });
  const [errors, setErrors] = useState({
    ...valueErrors,
  });
  const [activeStep, setActiveStep] = useState(1);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const errorValues = Object.values(errors).filter((err) => err.length > 0);
    const requiredFieldsTouched = touched.name && touched.email && touched.password;
    const isValid = !errorValues.length && requiredFieldsTouched;
    setIsFormValid(isValid)
  }, [errors, touched]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.currentTarget;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    setTouched({
      ...touched,
      [name]: true,
    });
  }

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value, type } = e.currentTarget;

    if (type !== 'checkbox') {
      const error = validate(type, value);

      setErrors({
        ...errors,
        [name]: error,
      });
    }
  }

  const handleStepChange = (e: React.FormEvent<HTMLButtonElement>, step: number) => {
    e.preventDefault();

    if (step < activeStep) {
      setActiveStep(step);
    }
  }

  const handleNext = (isFinalStep: boolean) => {
    if (isFormValid) {
      setActiveStep(activeStep + 1);
    }

    if (isFinalStep) {
      console.log(JSON.stringify(formData));
    }
  }

  return (
    <div className="multi-step-form">
      <ul className="multi-step-form__steps-list">
        {React.Children.map(children, (child, index) => {
          return (
            <li className="multi-step-form__steps-list__step">
              <button
                type="button"
                className={index === activeStep - 1 ? 'multi-step-form__steps-list__step__button--active' : 'multi-step-form__steps-list__step__button'}
                onClick={(e) => handleStepChange(e, child.props.step)}
              >
                {child.props.label}
              </button>
            </li>
          )
        })}
      </ul>
      <form>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child.props.children, {
            isActive: child.props.step === activeStep,
            values: formData,
            touched: touched,
            errors: errors,
            onChange: (e: React.FormEvent<HTMLInputElement>) => handleChange(e),
            onBlur: (e: React.FormEvent<HTMLInputElement>) => handleBlur(e),
            next: () => handleNext(child.props.step === children.length - 1),
          }, null)
        })}
      </form>
    </div>
  );
};
