import { useEffect, useState } from 'react'
import './FollowersCard.css'

// import { Followers } from '../../Data/FollowersData'
import User from '../User/User'
import { getAllUsers } from '../../api/userRequests'
import { useSelector } from 'react-redux';


const FollowersCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);

    const [people, setPeople] = useState([]);
    useEffect(() => {
        let isMounted = false
        const fetchPeopleData = async () => {
            if (!isMounted) {
                const { data } = await getAllUsers();
                setPeople(data)
            }
        }
        fetchPeopleData();
        return () => { isMounted = true }
    }, [])
    return (
        <div className="followers-card">
            <h3>People you may know</h3>

            {people.map((person, id) => {
                if (person._id !== user._id) {
                    return <User person={person} id={person._id} key={id} />
                }
            })}
        </div>
    )
}

export default FollowersCard