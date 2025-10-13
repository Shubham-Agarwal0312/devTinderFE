import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utility/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utility/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-2">
      <div className="flex justify-center mx-5">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="flex justify-center text-2xl">Edit Profile</div>

          <label className="label">First Name</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label className="label">Age</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <label className="label">About</label>
          <input
            type="text"
            className="input"
            placeholder=""
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <p className="text-red-500">{error}</p>
          <button className="btn btn-neutral mt-4" onClick={handleSaveProfile}>
            Save Profile
          </button>
        </fieldset>
      </div>
      <UserCard user={{ firstName, lastName, age, gender, photoURL, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
