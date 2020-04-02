import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AlertType } from '../processes/services/logic/types';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

interface Props {
  visible: boolean;
  message: string;
  onCloseSnackbar: () => void;
  alertType: AlertType;
}

export default function CustomizedSnackbars(props: Props) {

  const { visible, message, onCloseSnackbar, alertType } = props;
  const classes = useStyles();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    onCloseSnackbar();
  };

  return (
    <div className={classes.root}>
      <Snackbar open={visible} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert onClose={handleClose} severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}