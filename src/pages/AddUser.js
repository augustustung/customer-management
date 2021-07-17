import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 100,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const [info, setInfo] = useState({
      name: '',
      email: '',
      contact: '',
      address: "",
      status: ""
  })
  const history = useHistory()
  const dispatch = useDispatch()
  const [err, setError] = useState("");

  const {name, email, contact, address, status} = info

  const upDateInput = (e) => {
      let {name, value} = e.target;
      setInfo({...info, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !address  || !contact || !address || !status) {
        setError("Please input all the information!")
    }
    else {
        dispatch(addUser(info))
        setInfo({
            name: '',
            email: '',
            contact: '',
            address: "",
            status: ""
        })
        setError('')
        alert("Added user!")
    }


  }

  return (
      <div>
          <Button 
        style={{width: "100px", marginTop: "20px"}}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={() =>history.goBack() }
        >
            Go back
        </Button>
          <h2>Add User</h2>
          {err && <h3 style={{color: "red"}}>{err}</h3>}
        <form 
            className={classes.root} 
            noValidate 
            autoComplete="off"
            onSubmit={handleSubmit}
        >
        <TextField 
            id="standard-basic" 
            label="Name" 
            value={name}
            name="name"
            type="text"
            onChange={upDateInput}
        />
        <br/>
        <TextField 
            id="standard-basic" 
            label="Address" 
            name="address"
            value={address} 
            onChange={upDateInput}
        /><br/>
        <TextField 
            id="standard-basic" 
            label="Email"
            name="email"
             value={email}
             type="email"
             onChange={upDateInput}
            /><br/>
        <TextField 
            id="standard-basic" 
            label="Contact"
            value={contact}
            name="contact"
            type="number"
            onChange={upDateInput}
        /><br/>
        <TextField 
            id="standard-basic" 
            label="Status"
            value={status}
            name="status"
            onChange={upDateInput}
        /><br/>
        </form>
        <Button 
        style={{width: "100px"}}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
        >
            Submit
        </Button>
      </div>
  );
}