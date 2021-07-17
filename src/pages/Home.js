import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, loadUsers } from "../redux/action";

export default function Home() {
  const classes = useStyles();
  const buttonStyles = useButtonStyles();
  let dispatch = useDispatch();
  let history = useHistory()
  const { users, admin } = useSelector((state) => state.users);


  useEffect(() => {
    if(!admin) {
      console.log(`${admin}`)
      history.push('/')
    }
  }, [])
  
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);


  const handleDelete = (id) => {
      if(window.confirm("Are you sure wanna to delete this user ?")) {
          dispatch(deleteUsers(id))
      }
  }

  return (
    <div>
      <h3 className="title">Welcome back {admin.name} !</h3>
      <div className={buttonStyles.root}>
      <Button 
        variant="contained"
        color="primary"
        style={{marginTop: "110px"}}
        onClick={() => history.push('/add')}  
      >
        Add User
      </Button>
      </div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                <StyledTableCell align="center">{user.address}</StyledTableCell>
                <StyledTableCell align="center">{user.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className={buttonStyles.root}>
                    <ButtonGroup
                      variant="contained"
                      aria-label="contained primary button group"
                    >
                      <Button 
                        color="secondary"
                        onClick={() => handleDelete(user.id)}    
                      >Delete</Button>
                      <Button 
                        color="primary"
                        onClick={() => history.push(`/edit/${user.id}`)}
                      >Edit</Button>
                    </ButtonGroup>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

const useButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    paddingTop: 900,
    minWidth: 900,
  },
});
