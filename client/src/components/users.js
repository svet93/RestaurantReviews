import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from '../utils/axios';
import { API_URL } from '../constants';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.gray,
    },
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  delete: {
    cursor: 'pointer',
  },
}));

const Users = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get(`${API_URL}/users`).then((result) => {
      const nUsers = result.data;
      setUsers(nUsers);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (e, userId) => {
    await axios.delete(`${API_URL}/users/${userId}`);
    fetchUsers();
  };

  const handleUserTypeChange = async (e, userId) => {
    await axios.put(`${API_URL}/users/${userId}`, { userType: e.target.value });
    fetchUsers();
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Verified</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell align="right">Del?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.user_id}>
                <TableCell component="th" scope="row">
                  {u.user_id}
                </TableCell>
                <TableCell align="right">{u.email}</TableCell>
                <TableCell align="right">{u.first_name}</TableCell>
                <TableCell align="right">{u.last_name}</TableCell>
                <TableCell align="right">
                  <Select
                    value={u.user_type}
                    onChange={e => handleUserTypeChange(e, u.user_id)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="owner">Owner</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">{`${u.verified}`}</TableCell>
                <TableCell align="right">{`${u.active}`}</TableCell>
                <TableCell className={classes.delete} align="right" onClick={e => handleDeleteUser(e, u.user_id)}><DeleteIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default Users;
