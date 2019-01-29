import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ProductDialog from '../../components/ProductDialog/ProductDialog';

import { getShoppingCart, getEveryItemInCart } from '../../redux/modules/products';
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
  shoppingCartValues,
  handleCheckout,
  isInCart,
}) => (
  <Fragment>
    <List>
      {shoppingCartValues.map(product => (
        <ListItem
          key={`item-${product[0]._id}`}
          className={classes.list}
        >
          {product.length} {product[0].title} {product[0].price}
        </ListItem>
      ))}
      
    </List>
    <CheckoutButton
      classes={classes}
      handleCheckout={handleCheckout}
      title="Checkout"
      isInCart={isInCart}
    />
  </Fragment>
);

class CartDialog extends React.Component {
  render() {
    const {
      open,
      handleClose,
      classes,
      everyItemInCart,
      handleCheckout,
      shoppingCart,
    } = this.props;
    const itemsLength = everyItemInCart && everyItemInCart.length;
    const isInCart = itemsLength > 0;
    const shoppingCartValues = Object.values(shoppingCart);

    return (
      <ProductDialog
        open={open}
        handleClose={handleClose}
        title={`${itemsLength} items in cart`}
        content={
          <DialogContent
            classes={classes}
            shoppingCartValues={shoppingCartValues}
            handleCheckout={handleCheckout}
            isInCart={isInCart}
          />
        }
      />
    );
  }
}

CartDialog = withStyles(styles)(CartDialog);

CartDialog = connect(globalState => ({
  everyItemInCart: getEveryItemInCart(globalState),
  shoppingCart: getShoppingCart(globalState),
}))(CartDialog);

export default withMobileDialog()(CartDialog);