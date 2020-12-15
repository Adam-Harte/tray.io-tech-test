import React from 'react';

interface UserStepProps {
  values?: {
    name: string;
    role: string;
    email: string;
    password: string;
  };
  touched?: {
    name: boolean;
    role: boolean;
    email: boolean;
    password: boolean;
  };
  errors?: {
    name: string;
    role: string;
    email: string;
    password: string;
  };
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
  next?: (e: React.FormEvent<HTMLButtonElement>) => void;
  isActive?: boolean;
}

export const UserStep: React.FC<UserStepProps> = ({
  values = {
    name: '',
    role: '',
    email: '',
    password: '',
  },
  touched = {
    name: false,
    role: false,
    email: false,
    password: false,
  },
  errors = {
    name: '',
    role: '',
    email: '',
    password: '',
  },
  onChange = (e: React.FormEvent<HTMLInputElement>) => {},
  onBlur = (e: React.FormEvent<HTMLInputElement>) => {},
  next = (e: React.FormEvent<HTMLButtonElement>) => {},
  isActive = false,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    next(e);
  }

  return isActive ? (
    <React.Fragment>
      <label htmlFor="name">
        name: *
        <input type="text" name="name" id="name" value={values.name} required onChange={onChange} onBlur={onBlur} />
        {touched.name && errors.name}
      </label>
      <label htmlFor="role">
        role:
        <input type="text" name="role" id="role" value={values.role} onChange={onChange} onBlur={onBlur}/>
      </label>
      <label htmlFor="email">
        email: *
        <input type="email" name="email" id="email" value={values.email} required onChange={onChange} onBlur={onBlur} />
        {touched.email && errors.email}
      </label>
      <label htmlFor="password">
        password: *
        <input type="password" name="password" id="password" value={values.password} required onChange={onChange} onBlur={onBlur} />
        {touched.password && errors.password}
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  ) : null;
};
