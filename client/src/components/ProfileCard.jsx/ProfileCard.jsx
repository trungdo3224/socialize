import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import Cover from "../../img/cover.jpg";
// import Profile from "../../img/profileImg.jpg";
import "./ProfileCard.css";
import { serverPublic } from "../Post/Post";
import * as userApi from "../../api/userRequests";


const ProfileCard = ({ location }) => {

  const { user } = useSelector((state) => state.authReducer.authData);
  const data = useSelector((state) => state.postReducer.posts);
  const [currentProfile, setCurrentProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    let isMounted = false;
    const fetchUserPost = async () => {

      if (!isMounted && params.id) {
        const currentUser = await userApi.getUser(params.id);
        setCurrentProfile(currentUser.data)
      }
    }
    fetchUserPost();
    return () => {
      isMounted = true;
    };
  }, [params.id])
  // console.log(currentProfile)

  const userPost = data?.filter(post => post.userId === currentProfile._id);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={location === "profilePage" ?
            currentProfile.coverPicture ?
              `${serverPublic}${currentProfile.coverPicture}` :
              `${serverPublic}defaultCover.jpg` :
            user.coverPicture ?
              `${serverPublic}${user.coverPicture}` :
              `${serverPublic}defaultCover.jpg`}
          alt=""
        />
        <img src={location === "profilePage" ?
          currentProfile.profilePicture ?
            `${serverPublic}${currentProfile.profilePicture}` :
            `${serverPublic}defaultProfile.png` :
          user.profilePicture ?
            `${serverPublic}${user.profilePicture}` :
            `${serverPublic}defaultProfile.png`}
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>{currentProfile.firstname} {currentProfile.lastname}</span>
        <span>{currentProfile.worksAt ? currentProfile.worksAt : "Working at..."}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user?.following.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{userPost.length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {location === "profilePage" ? "" :
        <span>
          <Link to={`/profile/${user._id}`}>
            My Profile
          </Link>
        </span>
      }
    </div>
  );
};

export default ProfileCard;