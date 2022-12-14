import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { UilTrash } from "@iconscout/react-unicons";
import InputEmoji from 'react-input-emoji'


import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { likePost } from '../../api/postsRequest';
import * as userApi from "../../api/userRequests";
import { commentPost, deletePost, getPostCommentsById } from '../../redux/actions/post.action';
import CommentsList from '../CommentList/CommentsList';



export const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [postOf, setPostOf] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const [comment, setComment] = useState('');
  // const commentsData = useSelector((state) => state.postReducer.comments);
  const comments = useSelector((state) => state.postReducer.comments)
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = () => {
    setLiked((isLiked) => !isLiked);
    likePost(post._id, user._id);
    liked ? setLikesCount(prev => prev - 1) : setLikesCount(prev => prev + 1)
  }

  const fetchPost = () => {
    dispatch(getPostCommentsById(post._id))
  }
  const handleComment = (e) => {
    if (e.key === "Enter") {
      dispatch(commentPost(post._id, {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        comment: comment,
        postId: post._id
      }))
      setComment('');
      // dispatch(getPostCommentsById(post._id));
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post.")) {
      // console.log(post._id, user._id)
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



  const handleCommentEmo = (commentEmo) => {
    setComment(commentEmo);
  }
  return (
    <div className="post">
      <div className="post-user-infor">

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
      <img
        src={post.image ?
          `${process.env.REACT_APP_PUBLIC_FOLDER}${post.image}` :
          ""}
        alt=""
        className="post-img"
      />
      {post?.video && <video
        src={`${post.video}`}
        controls
        className="post-img"
      />}

      <div className="post-react">
        <div className='post-react-icons'>
          <img src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer' }} onClick={handleLike} />
          <img src={Comment} alt="" style={{ cursor: 'pointer' }} onClick={fetchPost} />
          <img src={Share} alt="" style={{ cursor: 'pointer' }} />
        </div>
        {user._id === data?._id && (
          <div className='post-utils'>
            <UilTrash style={{ cursor: 'pointer' }} onClick={handleDelete} />
          </div>
        )}
      </div>


      <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likesCount} likes</span>

      <div className="detail">

        <InputEmoji
          placeholder="Write comment..."
          value={comment}
          onChange={handleCommentEmo}
          onKeyDown={handleComment}
        />
        <div className='comment-section'>
          <CommentsList
            postId={post._id}
            currentUserId={user._id}
            commentsData={comments}
          />
        </div>
      </div>
    </div>
  )
}

export default Post