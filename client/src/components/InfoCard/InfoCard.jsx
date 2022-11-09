import React, { useState, useEffect } from "react";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "./InfoCard.css";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import * as userApi from "../../api/userRequests";
import { logout } from "../../redux/actions/auth.action";


const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const profileUserId = params.id;
  const [profile, setProfile] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfile(user)
      } else {
        const profileUser = await userApi.getUser(profileUserId);
        setProfile(profileUser)
      }
    }
    fetchProfileUser();
  }, [profileUserId])

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/auth")
  }

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h2>Profile</h2>
        <div>
          {profileUserId === user._id &&
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />}
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </div>
      </div>

      <div className="info">
        <span>
          <b>Relationship </b>
        </span>
        <span>{profile.relationship || "Single"}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profile.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profile.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
