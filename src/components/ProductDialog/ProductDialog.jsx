import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CartButton from '../../components/CartButton/CartButton';

const ProductDialog = ({
  open,
  handleClose,
  title,
  content
}) => (
  <Dialog
    fullWidth
    maxWidth="sm"
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
    <DialogContent>
      {content}
    </DialogContent>
    <DialogActions>
      <CartButton onClick={handleClose} color="primary" title="Close" />
    </DialogActions>
  </Dialog>
);

export default ProductDialog;