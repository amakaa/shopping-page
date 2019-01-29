import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import CartButton from '../../components/CartButton/CartButton';
import ProductDialog from '../../components/ProductDialog/ProductDialog';

import { getEveryItemInCart } from '../../redux/modules/products';
import CheckoutButton from '../../containers/CheckoutButton/CheckoutButton';

const styles = {
  list: {
    padding: 0,
    marginBottom: '20px'
  },
  button: {
    marginRight: '10px'
  }
};

const DialogContent = ({
  classes,
  product,
  handleAddToCart,
  disabled,
  handleCheckout,
  isInCart,
  handleRemoveFromCart
}) => (
  <Fragment>
    <List>
      <ListItem className={classes.list}>{product.description}</ListItem>
      <ListItem className={classes.list}>{product.price}</ListItem>
      <ListItem className={classes.list}>{product.stock.added || 0} {product.title}(s) in cart</ListItem>
      <ListItem className={classes.list}>{product.stock.remaining} remaining</ListItem>
    </List>
    <CartButton
      className={classes.button}
      onClick={handleAddToCart}
      title="Add to Cart"
      disabled={disabled}
    />
    <CheckoutButton
      classes={classes}
      handleCheckout={handleCheckout}
      title="Checkout"
      isInCart={isInCart}
    />
    <CartButton
      className={classes.button}
      onClick={handleRemoveFromCart} 
      title="Remove all from Cart"
      disabled={!isInCart}
    />
  </Fragment>
);

class InfoDialog extends React.Component {
  render() {
    const {
      open,
      handleClose,
      handleAddToCart,
      product,
      classes,
      everyItemInCart,
      handleCheckout,
      handleRemoveFromCart
    } = this.props;
    const isInCart = everyItemInCart.find(item => item._id === product._id);
    const isProductRemaining = product.stock.remaining > 0;

    return (
      <ProductDialog
        open={open}
        handleClose={handleClose}
        title={product.title}
        content={
          <DialogContent
            classes={classes}
            product={product}
            handleAddToCart={handleAddToCart}
            disabled={!isProductRemaining}
            handleCheckout={handleCheckout}
            isInCart={isInCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        }
      />
    );
  }
}

InfoDialog = withStyles(styles)(InfoDialog);

InfoDialog = connect(globalState => ({
  everyItemInCart: getEveryItemInCart(globalState),
}))(InfoDialog);

export default withMobileDialog()(InfoDialog);