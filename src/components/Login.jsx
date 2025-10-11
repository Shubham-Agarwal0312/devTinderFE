import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utility/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/constants";

const Login = () => {
  const [email, setEmail] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("Dhoni@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data.data));
      navigate("/");
    } catch (error) {
      console.log("error = ", error.message);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="flex justify-center text-2xl">Login</div>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
