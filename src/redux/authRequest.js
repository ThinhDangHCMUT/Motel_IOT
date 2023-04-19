import {
  loginFalse,
  loginStart,
  loginSuccess,
  registerFalse,
  registerSuccess,
  registerStart,
  logout,
} from "./authSlice";
import axios from "axios";

const BASE_URL = "https://d594-118-69-158-111.ngrok-free.app";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  const users = await axios.post(`${BASE_URL}/login`, user).then((res) => {
    if (!res.data) {
      dispatch(loginFalse());
      // const target = document.querySelector(".overlayz");
      alert("Login false");
    } else {
      dispatch(loginSuccess(res.data));
      navigate("/dashboard");
      return;
    }
  });
  return users;
};
export const logoutUser = async (dispatch, navigate) => {
  dispatch(logout());
  navigate("/login");
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    axios
      .post(`${BASE_URL}/register`, user)
      .then((res) => {
        if (res.data == "Lỗi: Mật khẩu chứa ít nhất 1 kí tự đặc biệt: @/$/&") {
          alert("Lỗi: Mật khẩu chứa ít nhất 1 kí tự đặc biệt: @/$/&");
        } else {
          alert("Đăng kí thành công");
          dispatch(registerSuccess());
          navigate("/login");
        }
      })
      .catch((error) => alert(error.response.data));
  } catch (error) {
    dispatch(registerFalse());
  }
};

