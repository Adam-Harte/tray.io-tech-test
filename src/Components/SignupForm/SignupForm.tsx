import React, { useEffect, useState } from 'react';

import { nameValidation, emailValidation, passwordValidation } from '../../Utils/validation';
import { UserStep } from '../UserStep/UserStep';
import { PrivacyStep } from '../PrivacyStep/PrivacyStep';

const validate = {
  name: (name: string) => nameValidation(name),
  email: (email: string) => emailValidation(email),
  password: (password: string) => passwordValidation(password),
  role: (value: string) => '',
  updates: (value: string) => '',
  otherProducts: (value: string) => '',
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    updates: true,
    otherProducts: false,
  });
  const [touched, setTouched] = useState({
    name: false,
    role: false,
    email: false,
    password: false,
    updates: false,
    otherProducts: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
    updates: '',
    otherProducts: '',
  });
  const [activeStep, setActiveStep] = useState(1);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const errorValues = Object.values(errors).filter((error) => error.length > 0);
    const requiredFieldsTouched = touched.name && touched.email && touched.password;

    setFormIsValid(!errorValues.length && requiredFieldsTouched);
  }, [touched, errors]);

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
    const { name, value } = e.currentTarget;

    const error = validate['name'](value);

    setErrors({
      ...errors,
      [name]: error,
    });
  }

  const handleStepChange = (e: React.FormEvent<HTMLButtonElement>, step: number) => {
    e.preventDefault();

    if (step < activeStep) {
      setActiveStep(step);
    }
  }

  const handleNext = () => {
    if (activeStep === 1 && formIsValid) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      setActiveStep(3);
    }
  }

  return (
    <React.Fragment>
      <ul>
        <li>
          <button
            type="button"
            onClick={(e) => handleStepChange(e, 1)}
          >
            User
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={(e) => handleStepChange(e, 2)}
          >
            Privacy
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={(e) => handleStepChange(e, 3)}
          >
            Done
          </button>
        </li>
      </ul>
      <form>
        {activeStep === 1 && (
          <UserStep
            values={formData}
            touched={touched}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
            next={handleNext}
          />
        )}

        {activeStep === 2 && (
          <PrivacyStep
            values={formData}
            onChange={handleChange}
            next={handleNext}
          />
        )}

        {activeStep === 3 && (
          <h3>Success!</h3>
        )}
      </form>
    </React.Fragment>
  );
};
