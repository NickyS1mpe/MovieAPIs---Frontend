import { Button } from "react-bootstrap";
import "./Profile.css";
import "../login/Login.css";
import { useNavigate } from "react-router-dom";

function Profile({ userData }) {
  const navigate = useNavigate();

  const edit = () => {
    navigate("Edit", {
      state: {
        userData: userData,
      },
    });
  };

  return (
    <div className="parent">
      <div className="blur">
        <div id="contact">
          <div style={{ paddingRight: "5vh" }}>
            <img key={userData.avatar} src={userData.avatar || null} />
          </div>

          <div>
            <h1>
              {userData.nickname ? <>{userData.nickname}</> : <i>No Name</i>}
            </h1>

            {userData.twitter && (
              <p>
                <a
                  target="_blank"
                  href={`https://twitter.com/${userData.twitter}`}
                  rel="noopener noreferrer"
                >
                  {userData.twitter}
                </a>
              </p>
            )}

            {userData.emailAddress && <p>{userData.emailAddress}</p>}
            {userData.joinDate && <p>{userData.joinDate}</p>}

            {userData.notes && (
              <p style={{ width: "30vh" }}>{userData.notes}</p>
            )}

            <div>
              <Button
                variant="outline-light"
                className="me-2"
                onClick={() => edit()}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
