import React from "react";
import logo from "../images/logo3.png"
import { useEffect } from "react";
import axios from "axios"


const Login = (props) => {
  useEffect(() => {
    let inpUsername = document.getElementById("floatingInput")
    let inpPassword = document.getElementById("floatingPassword")
    let form = document.querySelector(".login form")
    const setCookie = (cname, cvalue) => {
      document.cookie = cname + "=" + cvalue + ";path=/";
    }
    const submitForm = () => {
      let loginData = {
        username: inpUsername.value,
        password: inpPassword.value
      }
      axios.post("https://blgrv-api.orizon.qa/api/token/" , loginData)
      .then((res)=>{
        console.log(res);
        console.log(res.data.access);
        setCookie("token", res.data.access)
        props.setToken(res.data.access)
        props.login(true)
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    form.onsubmit = (e) =>{
      e.preventDefault()
      submitForm()
    }
  }, [props]);
  return (
    <div className="container">
      <div className="login bg-light border border-2 rounded rounded-3">
      <img src={logo} alt="belgravia" />
      <form action="POST" className="w-100">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name-example"
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-secondary my-3">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
