import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ProductList from '../ProductList/ProductList.jsx';

import {
  loadProducts,
  getProducts,
} from '../../redux/modules/products';

const styles = theme => ({
  productPage: {
    marginTop: '40px',
  },
});

class Products extends PureComponent {
  componentDidMount() {
    this.props.dispatch(loadProducts());
  }

  render() {
    const { products, classes } = this.props;
    const productsLength = products && products.length;

    return (
      <div className={classes.productPage}>
        {!productsLength ?
          <Fragment>Loading...</Fragment> :
          <ProductList
            rows={products}
          />
        }
      </div>
    );
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

Products = connect(globalState => ({
  products: getProducts(globalState),
}))(Products);

export default withStyles(styles)(Products);