import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utility/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
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
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("handleSignup res: ", res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.log("res err: ", error.response.data);
      console.log("handleSignup err: ", error.message);
    }
  };

  return (
    <div className="flex justify-center my-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="flex justify-center text-2xl">
          {isLoginForm ? "Login" : "Signup"}
        </div>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </>
        )}

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
        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Signup"}
        </button>
        <p
          className="text-center my-2 cursor-pointer"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {!isLoginForm ? "Existing User? Login here" : "New User? Signup here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
