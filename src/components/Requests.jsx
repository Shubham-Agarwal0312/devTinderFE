import axios from "axios";
import { BASE_URL } from "../utility/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utility/requests";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log("fetchRequests res = ", res.data);
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) {
    return <h1>No Connection Found</h1>;
  }
  return (
    <div className="flex flex-col justify-center w-2/3 mx-auto my-5">
      <h1 className="text-2xl font-bold text-center">
        Connection Requests({requests.length})
      </h1>
      {requests.map((request) => {
        const { firstName, lastName, age, photoURL, gender, about } =
          request.fromUserId;
        return (
          <div className="flex p-4 m-4 bg-base-300 rounded-2xl items-center justify-between">
            <div className="flex items-center">
              <div className="flex w-20 h-20 shrink-0">
                <img
                  className="w-20 h-20 rounded-full bg-cover"
                  alt="photo"
                  src={photoURL}
                />
              </div>
              <div className="m-2">
                <h2 className="font-bold text-lg">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p>
                    {age}, {gender}
                  </p>
                )}
                <p>{about}</p>
              </div>
            </div>
            <div className="flex">
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
