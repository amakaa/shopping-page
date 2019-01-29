import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = require('./Snackbar.scss');

let openSnackbarFn;

class PositionedSnackbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  componentDidMount() {
    openSnackbarFn = this.handleOpen;
  }

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }
  render() {
    const { open } = this.state;

    return (
      <div>
        <Snackbar
          className="snackbar-container"
          autoHideDuration={2000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={
            <span id="message-id" className="message">
              <CheckCircleIcon />
              Successfully checked out
            </span>
          }
        />
      </div>
    );
  }
}

export function openSnackbar() {
  openSnackbarFn();
}

PositionedSnackbar = withStyles(styles)(PositionedSnackbar);

export default PositionedSnackbar;