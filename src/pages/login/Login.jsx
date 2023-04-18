import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./login.scss";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  console.log(user);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', user);
      console.log("Data: ",response.data)
      localStorage.setItem('USER', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <div class="page">
      <div class="container">
        <div class="leftInput">
          <div class="login">Login</div>
          <div class="eula">Motel Management</div>
        </div>
        <div class="rightInput">
          <div class="form">
            <label class="title" for="username">
              Username
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                setUser((state) => {
                  return {
                    ...state,
                    username: e.target.value,
                  };
                });
              }}
            />
            <label class="title" for="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setUser((state) => {
                  return {
                    ...state,
                    password: e.target.value,
                  };
                });
              }}
            />
            <input
              type="submit"
              id="submit"
              value="Submit"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
