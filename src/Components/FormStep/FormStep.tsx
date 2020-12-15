import React from 'react';

interface FormStepProps {
  children: JSX.Element;
  step: number;
  label: string;
}

export const FormStep: React.FC<FormStepProps> = ({
  children,
  step,
  label,
}) => (
  <div>
    {children}
  </div>
);
