import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CheckoutButton from '../../containers/CheckoutButton/CheckoutButton';
import CartDialog from '../../containers/CartDialog/CartDialog';

import { clearCart, getEveryItemInCart } from '../../redux/modules/products';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  openCartDialog = () => {
    this.setState({
      open: true,
    });
  }
  
  closeCartDialog = () => {
    this.setState({
      open: false,
    });
  }
  checkout = () => {
    const { dispatch } = this.props;
    dispatch(clearCart());
    this.closeCartDialog();
  }

  render () {
    const { classes, everyItemInCart } = this.props;
    const { open } = this.state;
    const itemsLength = everyItemInCart && everyItemInCart.length;
    const isInCart = itemsLength > 0;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {itemsLength} item(s) in shopping cart
            </Typography>
            <Button color="inherit" onClick={this.openCartDialog}>View Shopping Cart</Button>
            <CheckoutButton
              classes={classes}
              handleCheckout={this.checkout}
              title="Checkout"
              isInCart={isInCart}
            />
            <CartDialog
              open={open}
              handleClose={this.closeCartDialog}
              handleCheckout={this.checkout}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
  

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
ButtonAppBar = connect(globalState => ({
  everyItemInCart: getEveryItemInCart(globalState),
}))(ButtonAppBar);

export default withStyles(styles)(ButtonAppBar);