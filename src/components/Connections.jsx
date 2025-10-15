import axios from "axios";
import { BASE_URL } from "../utility/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utility/connections";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log("fetchConnections res = ", res.data.data);
    } catch (error) {
      console.log("fetchConnections error = ", error.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) {
    return <h1>No Connection Found</h1>;
  }
  return (
    <div className="flex flex-col justify-center w-1/2 mx-auto my-5">
      <h1 className="text-2xl font-bold text-center">
        Connections({connections.length})
      </h1>
      {connections.map((connection) => {
        const { firstName, lastName, age, photoURL, gender, about } =
          connection;
        return (
          <div className="flex p-4 m-4 bg-base-300 rounded-2xl">
            <div className="flex w-20 h-20">
              <img
                className="w-20 h-20 rounded-full"
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
        );
      })}
    </div>
  );
};

export default Connections;
