import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CartButton from '../../components/CartButton/CartButton';
import { openSnackbar } from '../../components/Snackbar/Snackbar';

import { clearCart } from '../../redux/modules/products';


class CheckoutButton extends React.Component {
  checkout = () => {
    const { dispatch, handleCheckout } = this.props;
    dispatch(clearCart());
    handleCheckout();
    openSnackbar();
  }

  render() {
    const { classes, isInCart } = this.props;

    return (
      <Fragment>
        <CartButton
          className={classes.button}
          onClick={this.checkout}
          title="Checkout"
          disabled={!isInCart}
        />
      </Fragment>
    );
  } 
}

CheckoutButton = connect()(CheckoutButton);
export default CheckoutButton;