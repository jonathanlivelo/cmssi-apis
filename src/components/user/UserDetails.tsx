import React, { useState, useEffect }  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import {User} from '../../models/User';


export default function UserDetails(props: any) {
    const user:User = props.user;
    const openForm:boolean = props.openForm;
    const handleClose = props.handleClose;
    return (
    <div>
          <Dialog
            open={props.showForm}
            onClose={handleClose}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  const firstName = formJson.firstName;
                  console.log(firstName);
                  handleClose();
                },
              },
            }}
          >
            <DialogTitle>User</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address here. We
                will send updates occasionally.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="firstName"
                name="firstName"
                label="firstName"
                type="string"
                fullWidth
                variant="standard"
              >
              ${user.firstName}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog>
    </div>
    );
}
