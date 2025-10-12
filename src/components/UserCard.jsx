const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoURL, about } = user;
  console.log("photoURL = ", photoURL);
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && <div>Age: {age} </div>}
        {gender && <div>Gender: {gender}</div>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
