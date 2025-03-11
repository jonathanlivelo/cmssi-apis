import React, { useState, useEffect }  from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {UserAPI} from '../../apis/UserAPI';
import {User} from '../../models/User';
import UserDetails from './UserDetails';
import {useDialogs } from '@toolpad/core/useDialogs';
import {
           DataGrid,
           GridColDef,
           GridToolbarContainer,
           GridActionsCellItem,
           GridRowId,
           GridSlotProps } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const paginationModel = { page: 0, pageSize: 5 };
export default function UserCMP() {
const [tableData, setTableData] = useState<User[]>([]);
const [loadData, setLoadData] = useState<boolean>(true);
const [openForm, setOpenForm] = useState<boolean>(false);
const [user, setUser] = useState<User>();
const dialogs = useDialogs();
function EditToolbar(props: GridSlotProps['toolbar']) {
  const handleClick = () => {
      setOpenForm(true);
      setUser({});
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
const handleDeleteClick = (id: GridRowId) => () => {
     if(typeof id !== 'string'){
          const deleteConfirmed = dialogs.confirm(
                 `Are you sure you want to delete "${id}"?`,
               );
           deleteConfirmed.then(response=>{
                   if (response){
                              UserAPI.deleteOne(id).then(response => {
                                    setLoadData(true);
                                  });

                   }
               });



     }
 };
 const handleEditClick = (id: GridRowId) => () => {
      if(typeof id !== 'string'){
        const result = UserAPI.getOne(id);
        result.then((value) => {
            setUser(value);
            setOpenForm(true);
        });
      }
  };
 const handleClose  = () =>  {
      setOpenForm(false);
      setLoadData(true);
  };
 const columns: GridColDef[] = [
   {
           field: 'actions',
           type: 'actions',
           headerName: 'Actions',
           width: 100,
           cellClassName: 'actions',
           getActions: ({ id }) => {
             return [
               <GridActionsCellItem
                 icon={<EditIcon />}
                 label="Edit"
                 className="textPrimary"
                 onClick={handleEditClick(id)}
                 color="inherit"
               />,
               <GridActionsCellItem
                 icon={<DeleteIcon />}
                 label="Delete"
                 color="inherit"
                 onClick={handleDeleteClick(id)}
               />,
             ];
           },
         },
   { field: 'id', headerName: 'ID', width: 70 },
   { field: 'firstName', headerName: 'First name', width: 130 },
   { field: 'lastName', headerName: 'Last name', width: 130 },
   { field: 'userName', headerName: 'User name', width: 130 }
 ];
useEffect(() => {
    if (loadData){
        setLoadData(false);
        const result = UserAPI.getAll();
        result.then((value) => {
            setTableData(value);
        });
    }
}, [loadData]);

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={tableData}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: EditToolbar }}
        sx={{ border: 0 }}
      />
      <UserDetails openForm={openForm} handleClose={handleClose} user={user} />
    </Paper>

  );
}
