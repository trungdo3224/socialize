import { useState, useEffect } from 'react';
import { getUser } from "../../api/userRequests"

const Conversation = ({ data, currentUserId, online }) => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        let isMounted = false;
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            if (!isMounted) {
                try {
                    const { data } = await getUser(userId)
                    // console.log(data);
                    setUserData(data);
                } catch (error) {
                    console.error(error)
                }
            }
        }
        getUserData();
        return () => {
            isMounted = true;
        }
    }, [])
    return (
        <>
            <div className='follower conversation'>

                <div>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={`${process.env.REACT_APP_PUBLIC_FOLDER}${userData?.profilePicture}`
                            || `${process.env.REACT_APP_PUBLIC_FOLDER}defaultProfile.png`}
                        alt=""
                        className='follower-image'
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span>{online ? 'Online' : 'Offline'}</span>
                    </div>

                </div>

            </div>
            <hr />
        </>

    )
}

export default Conversation
