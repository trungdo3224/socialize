import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { UilTrash, UilPen } from "@iconscout/react-unicons";

import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { likePost } from '../../api/postsRequest';
import * as userApi from "../../api/userRequests";
import { commentPost, deletePost } from '../../redux/actions/post.action';
import CommentsList from '../CommentList/CommentsList';


export const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [postOf, setPostOf] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const comments = useSelector((state) => state.postReducer.comments);
  const [comment, setComment] = useState('');

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = () => {
    setLiked((isLiked) => !isLiked);
    likePost(post._id, user._id);
    liked ? setLikesCount(prev => prev - 1) : setLikesCount(prev => prev + 1)
  }

  const handleComment = (e) => {
    if (e.key === "Enter") {
      dispatch(commentPost(post._id, {
        userId: user._id,
        comment: comment,
      }))
      setComment('');
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post.")) {
      console.log(post._id, user._id)
      deletePost(post._id, user._id);
      dispatch(deletePost(post._id, user._id))
    }
  }

  useEffect(() => {
    let isMounted = false;
    const fetchUserPost = async () => {
      const postUser = await userApi.getUser(post?.userId);
      if (!isMounted) {
        setPostOf(postUser)
      }
    }
    fetchUserPost();
    return () => {
      isMounted = true;
    };
  }, [])
  const { data } = postOf;
  // console.log(post);
  // console.log(data);
  // console.log(post.userId, data?._id, user._id);

  return (
    <div className="Post">
      <div className="postUserInfor">

        <Link to={`/profile/${data?._id}`}>
          <img
            src={
              data?.profilePicture
                ? `${serverPublic}${data.profilePicture}`
                : serverPublic + "defaultProfile.png"
            }
            alt="Profile"
            className="avatar"
          />
        </Link>
        <p><b><Link to={`/profile/${data?._id}`}>{data?.firstname} {data?.lastname}</Link></b> <br />posted <Moment fromNow>{post.createdAt}</Moment></p>

      </div>

      <span>{post.desc}</span>
      <img src={post.image ? `${process.env.REACT_APP_PUBLIC_FOLDER}${post.image}` : ""} alt="" className="postImg" />


      <div className="postReact">
        <div className='postReactIcons'>
          <img src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer' }} onClick={handleLike} />
          <img src={Comment} alt="" style={{ cursor: 'pointer' }} />
          <img src={Share} alt="" style={{ cursor: 'pointer' }} />
        </div>
        {user._id === data?._id && (
          <div className='postUtils'>
            <UilPen style={{ cursor: 'pointer' }} />
            <UilTrash style={{ cursor: 'pointer' }} onClick={handleDelete} />
          </div>
        )}
      </div>


      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likesCount} likes</span>

      <div className="detail">
        {/* <span><b>{post.name}</b></span> */}
        <input
          type="text"
          placeholder="Write comment..."
          className="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleComment}
        />
        {comments.lengt > 0 &&
          <div className="comment-section">
            {comments.map((comment, index) => (
              <input key={index} postId={post._id} currentUserId={user._id} commentData={comment} />
            ))}
          </div>
          }
      </div>
    </div>
  )
}

export default Post