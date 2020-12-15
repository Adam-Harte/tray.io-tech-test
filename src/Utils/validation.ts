export const nameValidation = (value: string) => {
  if (value.trim() === '') {
    return 'name is required';
  }

  if (/[^a-zA-Z -]/.test(value)) {
    return 'Invalid characters';
  }

  return '';
}

export const emailValidation = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.toLowerCase())) {
    return '';
  }

  if (email.trim() === '') {
    return 'Email is required';
  }

  return 'Please enter a valid email';
}

export const passwordValidation = (password: string) => {
  if (password.trim() === '') {
    return 'Password is required';
  }

  if (password.trim().length < 9) {
    return 'Password must contain more than 9 characters';
  }

  const re = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/;
  if (password.trim().length > 9 && !re.test(password)) {
    return 'Password must contain at least one number, uppercase letter and lower case leter';
  }

  return '';
}

export const validate = (type: string, value: string): string => {
  if (type === 'text') {
    return nameValidation(value);
  }

  if (type === 'email') {
    return emailValidation(value);
  }

  if (type === 'password') {
    return passwordValidation(value);
  }

  return '';
}
