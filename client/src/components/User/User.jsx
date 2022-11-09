import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../redux/actions/user.action';
import { useState } from 'react';

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const User = ({ person, id }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user._id));

    const dispatch = useDispatch();
    const handleFollow = () => {
        following
            ? dispatch(unFollowUser(person._id, user))
            : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
    }

    return (
        <div className="follower">

            <div>
                <img src={person.profilePicture ?
                    `${serverPublic}${person.profilePicture}`:
                    `${serverPublic}defaultProfile.png`} alt="" className='follower-image' />
                <div className="name">
                    <Link to={`/profile/${id}`}>
                        <span><b>{person.firstname} {person.lastname}</b></span>
                    </Link>
                </div>
            </div>
            <button
                className={
                    following ? "button fc-button unfollow-button" : "button fc-button"
                }
                onClick={handleFollow}
            >
                {following ? "Unfollow" : "Follow"}
            </button>
        </div>
    )
}

export default User
