import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser, upDateUser } from '../redux/action';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: 100,
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

export default function EditUser() {
  const classes = useStyles();
  const [info, setInfo] = useState({
      name: '',
      email: '',
      contact: '',
      address: "",
      status: "",
  })
  const {id} = useParams()
  const history = useHistory()
  const { user } = useSelector((state)=> state.users)
  const dispatch = useDispatch()
  const [err, setError] = useState("");

  const {status, name, email, contact, address} = info

  useEffect(() => {
      dispatch(getSingleUser(id))
  },[dispatch])

  useEffect(() => {
    if(user)  {
        setInfo({...user})
    }
  },[user])

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
        dispatch(upDateUser(info, id))
        setInfo({
            name: '',
            email: '',
            contact: '',
            address: "",
            status: "",
        })
        setError('')
        history.goBack()
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
          <h2>Edit User</h2>
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
                value={name || ""}
                name="name"
                type="text"
                onChange={upDateInput}
            />
            <br/>
            <TextField 
                id="standard-basic" 
                label="Address" 
                name="address"
                value={address|| ""} 
                onChange={upDateInput}
            /><br/>
            <TextField 
                id="standard-basic" 
                label="Email"
                name="email"
                value={email|| ""}
                type="email"
                onChange={upDateInput}
                /><br/>
            <TextField 
                id="standard-basic" 
                label="Contact"
                value={contact|| ""}
                name="contact"
                type="number"
                onChange={upDateInput}
            /><br/>
            <TextField 
                id="standard-basic" 
                label="Status"
                value={status|| ""}
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