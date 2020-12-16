import React from 'react';

import { FormStep } from '../FormStep/FormStep';
import { MultiStepForm } from '../MultiStepForm/MultiStepForm';
import { UserStep } from '../UserStep/UserStep';
import { PrivacyStep } from '../PrivacyStep/PrivacyStep';
import { Success } from '../Success/Success';

export const SignUpForm: React.FC = () => {
  return (
    <MultiStepForm
      values={{
        name: '',
        role: '',
        email: '',
        password: '',
        updates: true,
        otherProducts: false,
      }}
      touchedValues={{
        name: false,
        role: false,
        email: false,
        password: false,
        updates: false,
        otherProducts: false,
      }}
      valueErrors={{
        name: '',
        role: '',
        email: '',
        password: '',
        updates: '',
        otherProducts: '',
      }}
    >
      <FormStep
        step={1}
        label="User"
      >
        <UserStep />
      </FormStep>
      <FormStep
        step={2}
        label="Privacy"
      >
        <PrivacyStep />
      </FormStep>
      <FormStep
        step={3}
        label="Done"
      >
        <Success />
      </FormStep>
    </MultiStepForm>
  );
};
