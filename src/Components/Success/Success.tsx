import React from 'react';

import './Success.css';

interface SuccessProps {
  isActive?: boolean;
}

export const Success: React.FC<SuccessProps> = ({
  isActive = false,
}) => isActive ? (
  <div className="success">
    <h3>Success</h3>
    <p>Please verify your email address, you should have received an email from us already!</p>
  </div>
) : null;
