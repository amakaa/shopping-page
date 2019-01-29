import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import InfoDialog from '../InfoDialog/InfoDialog';

import CartButton from '../../components/CartButton/CartButton';
import { openSnackbar } from '../../components/Snackbar/Snackbar';

import { ROW_TITLES } from '../../constants/product-fields';

import { subtractProductStock, addProductStock } from '../../redux/modules/products';

const mainStyles = require('./ProductList.scss');

const styles = theme => ({
  root: {
    flexShrink: 0,
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const ProductTable = ({ row, handleOpen, handleAddToCart, remaining }) => (
  <TableRow className={styles.tableRow} onClick={handleOpen}>
    <TableCell className="table-sm">{row.title}</TableCell>
    <TableCell className="table-sm">{row.price}</TableCell>
    <TableCell className="table-sm">
      <img className="image-sm" src={row.image} alt={`product-${row._id}`} />
    </TableCell>
    <TableCell className="table-sm">
      <CartButton title="Add to Cart" onClick={handleAddToCart} disabled={remaining === 0} />
    </TableCell>
  </TableRow>
);

class ProductList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedProduct: null,
    }
  }

  openInfoDialog = (id) => {
    this.setState({
      open: true,
      selectedProduct: id
    });
  }
  
  closeInfoDialog = (id) => {
    this.setState({
      open: false,
      selectedProduct: id
    });
  }

  addToCart = (e, id) => {
    e.stopPropagation();
    const { dispatch } = this.props;
    dispatch(subtractProductStock(id));
  }

  removeFromCart = (id) => {
    const { dispatch } = this.props;
    dispatch(addProductStock(id));
  }

  handleCheckout = (id) => {
    this.closeInfoDialog(id);
    openSnackbar();
  }

  renderInfoDialog = (row) => {
    const { open } = this.state;
    const { _id: id } = row;
    return (
      <InfoDialog
        open={open}
        handleClose={() => this.closeInfoDialog(id)}
        handleAddToCart={(e) => this.addToCart(e, id)}
        handleRemoveFromCart={() => this.removeFromCart(id)}
        product={row}
        handleCheckout={() => this.handleCheckout(id)}
      />
    );
  }

  render() {
    const { classes, rows } = this.props;
    const { open, selectedProduct } = this.state;

    return (
      <Fragment>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {ROW_TITLES.map(title => (
                  <TableCell className="thead-sm" key={title}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {rows.map(row => {
              const { _id: id, stock: { remaining } } = row;

              return (
                <TableBody key={`tbody-${id}`} className={classes.tableRow}>
                  <ProductTable
                    key={`product-${id}`}
                    row={row}
                    handleOpen={() => this.openInfoDialog(id)}
                    handleAddToCart={(e) => this.addToCart(e, id)}
                    remaining={remaining}
                  />
                  {open && (selectedProduct === id) && this.renderInfoDialog(row)}
                </TableBody>
              )
            })}
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
};

ProductList = connect()(ProductList);

export default withStyles(styles, mainStyles)(ProductList);