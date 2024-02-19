import React, { useState, useContext } from 'react'
import classes from './SignUp.module.css'
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {auth} from '../../Utility/Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { DataContext } from '../../components/DataProvider/DataProvider';
import { ClipLoader } from 'react-spinners';
import { Type } from '../../Utility/action.type';


function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState ("");
  const [loading, setLoading] = useState ({
    signin:false,
    signup:false
  })

  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
console.log(navStateData);

const authHandler = async(e)=>{
e.preventDefault();
// console.log(e.target.name);
if(e.target.name == "signin"){
//firebase authentication
      setLoading({...loading, signin:true});
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch ({
          type:Type.SET_USER,
          user:userInfo.user,
        });
        setLoading({...loading, signin:false});
        navigate(navStateData?.state?.redirect || "/");
      })
      .catch((err)=>{
        setError(err.message)
        setLoading({...loading, signin:false})
      })
       
}else{
      setLoading({...loading, signup:true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        dispatch ({
          type:Type.SET_USER,
          user:userInfo.user,
        });
        setLoading({...loading, signup:false});
        navigate(navStateData?.state?.redirect || "/");
      })
      .catch((err)=>{
        setError(err.message)
        setLoading({...loading, signup:false})
      })

}
};
  // console.log(password, email);


  return ( <section className={classes.login}>
    {/* logo */}
    <Link to={"/"}>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png" alt="Logo" />
    </Link>
 
    {/* form */}
    <div className={classes.login_container}>
      <h1>Sign In</h1>
      <small></small>
      {navStateData?.state?.msg && (
        <small 
           style={{
            padding:"5px",
            textAlign:"center",
            color:"red",
            fontWeight:"bold",
           }}
        >
         {navStateData?.state?.msg}
        </small>
      )}
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input value ={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input value ={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
        </div>
      <button type= "submit" onClick={authHandler}name="signin"  className={classes.login_btn}> {loading.signin ?(<ClipLoader color="black" size={15}></ClipLoader>):("Sign In")}</button>
      </form>
      {/* agreement */}
      <p>By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale.  Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice</p>

      {/* Create a New account button */}
      <button type= "submit" name="signup" onClick={authHandler} className={classes.register_btn}> {loading.signup ?(<ClipLoader color="black" size={15}></ClipLoader>):("Create your Amazon Account")}</button>
        {error && <small style ={{paddingTop:"5px", color:"red"}}>{error}</small>}
    </div>

  </section> 

  );
  }
  
export default Auth
