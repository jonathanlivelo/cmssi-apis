import React, { useState, useEffect }  from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Hidden from '@mui/material/Hidden';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import {User} from '../../models/User';
import {UserAPI} from '../../apis/UserAPI';


export default function UserDetails(props: any) {
    let user:User = props.user;
    const openForm:boolean = props.openForm;
    const handleClose = props.handleClose;
    return (
    <div>
          <Dialog
            open={openForm}
            onClose={handleClose}
            slotProps={{
              paper: {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  user = {id:user.id, firstName : formJson.firstName, lastName: formJson.lastName, userName: formJson.userName, password: formJson.password}
                  UserAPI.createUpdate(user);
                  handleClose();
                },
              },
            }}
          >
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                defaultValue={user != null ? user.firstName : ''}
                margin="dense"
                id="firstName"
                name="firstName"
                label="firstName"
                type="string"
                fullWidth
                variant="standard"
              />
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="lastName"
                  type="string"
                  fullWidth
                  variant="standard"
                  defaultValue = {user != null ? user.lastName : ''}
               />
               <TextField
                 autoFocus
                 required
                 margin="dense"
                 id="userName"
                 name="userName"
                 label="userName"
                 type="string"
                 fullWidth
                 variant="standard"
                 defaultValue = {user != null ? user.userName : ''}
               />

               <TextField
                 autoFocus
                 required
                 margin="dense"
                 id="password"
                 name="password"
                 label="password"
                 type="password"
                 fullWidth
                 variant="standard"
                 defaultValue={user != null ? user.password : ''}
               />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Dialog>
    </div>
    );
}
