
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginF } from '../redux/action';

function Login() {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    let history = useHistory()
    const dispatch = useDispatch()
    const { admin } = useSelector((state) => state.users)


    const submit = () => {
        if(!username.trim() || !password.trim())
            setErr("Please enter username and password!")
        dispatch(LoginF(username, password))
        if(admin === "error")
            setErr("username or password wrong!")
        else
            history.push("/home")
    }

    return(
        <div id="loginform">
          
      <h2 id="headerTitle">Login</h2>
      <div>
       <FormInput 
            value={username} 
            description="Username" 
            placeholder="Username" 
            onChange={(text)=>setUserName(text.target.value)}
            type="text" 
        />
       <FormInput 
            value={password}
            onChangeText
            description="Password" 
            placeholder="Password" 
            onChange={(text)=>setPassword(text.target.value)}
            type="password"
        />
       <div id="button" class="row">
       {err && <p style={{color: "red"}}>{err}</p>}
      <button onClick={submit}>Sign in</button>
      
    </div>
     </div>
        </div>
      )
}
  
const FormInput = props => (
<div class="row">
    <label>{props.description}</label>
    <input 
        value={props.value} 
        onChange={props.onChange} 
        placeholder={props.placeholder}
        type={props.type}
    />
</div>  
);
export default Login