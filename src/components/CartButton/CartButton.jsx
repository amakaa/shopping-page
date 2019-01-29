import React from 'react';
import Button from '@material-ui/core/Button';

const CartButton = ({ title, onClick, className, disabled }) => (
  <Button
    className={className}
    variant="contained"
    color="primary"
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </Button>
);

export default CartButton;