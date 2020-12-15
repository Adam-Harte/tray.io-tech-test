import React from 'react';

interface PrivacyStepProps {
  values?: {
    updates: boolean;
    otherProducts: boolean;
  };
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  next?: (e: React.FormEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

export const PrivacyStep: React.FC<PrivacyStepProps> = ({
  values = {
    updates: true,
    otherProducts: false,
  },
  onChange = (e: React.FormEvent<HTMLInputElement>) => {},
  next = (e: React.FormEvent<HTMLButtonElement>) => {},
  isActive = false,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

      next(e);
  }

  return isActive ? (
    <React.Fragment>
      <label htmlFor="updates">
        <input type="checkbox" name="updates" id="updates" checked={values.updates} onChange={onChange} />
        Receive updates about Tray.io products by email
      </label>
      <label htmlFor="otherProducts">
        <input type="checkbox" name="otherProducts" id="otherProducts" checked={values.otherProducts} onChange={onChange} />
        Receive communication by email for other products created by the Tray.io team
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  ) : null;
};
