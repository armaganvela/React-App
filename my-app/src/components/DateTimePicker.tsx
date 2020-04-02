import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

interface Props {
    eventDate: string;
    onChangeEventDate: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }
  
export default function DatePickers(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        value={props.eventDate}
        onChange={props.onChangeEventDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}