import axios from "axios";
import { BASE_URL } from "../utility/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utility/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoURL, about } = user;
  const dispatch = useDispatch();

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      console.log("sendRequest res = ", res.data);
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log("sendRequest err: ", error.message);
    }
  };
  return (
    <div className="card bg-base-300 w-80 shadow-sm">
      <figure>
        <img src={photoURL} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && <div>Age: {age} </div>}
        {gender && <div>Gender: {gender}</div>}
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => sendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => sendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
