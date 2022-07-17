import React from "react";
import logo from "../images/logo3.png";
import { useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const Login = (props) => {
  // const [logged, setLogged] = useState(false);
  useEffect(() => {
    let inpUsername = document.getElementById("floatingInput");
    let inpPassword = document.getElementById("floatingPassword");
    let alert = document.querySelector(".alert")
    let form = document.querySelector(".login form");
    let loading = document.querySelector(".loading");
    // const setCookie = (cname, cvalue) => {
    //   document.cookie = cname + "=" + cvalue + ";path=/";
    // }
    const submitForm = () => {
      let loginData = {
        username: inpUsername.value,
        password: inpPassword.value,
      };
      axios
        .post("https://blgrv-api.orizon.qa/api/token/", loginData)
        .then((res) => {
          document.cookie = "token=" + res.data.access + ";path=/";
          console.log(res.data.access);
          props.login(true);
          // setLogged(true)
        })
        .catch((err) => {
          console.log(err);
          inpUsername.classList.add("is-invalid")
          inpPassword.classList.add("is-invalid")
          alert.style.display = "block"
          loading.style.display = "none"
        });
    };
    form.onsubmit = (e) => {
      e.preventDefault();
      loading.style.display = "grid"
      submitForm();
    };
  }, [props]);
  return (
    <div className="container">
      <div className="login bg-light border border-2 rounded rounded-3">
        <img src={logo} alt="belgravia" />
          <Loading />
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
            <div className="alert alert-danger my-3" role="alert">
              Username or Password is not correct! try agine.
            </div>
            <input
              type="submit"
              className="btn btn-secondary my-3 w-100"
              value="Submit"
            />
          </form>
      </div>
    </div>
  );
};

export default Login;
