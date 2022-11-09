import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { UilTrash, UilPen } from "@iconscout/react-unicons";

import * as userApi from "../../api/userRequests";
import "./CommentsList.css";
import { deleteComment } from '../../api/postsRequest';


const CommentsList = ({currentUserId, commentData, postId }) => {
  const { userId, comment, createdAt } = commentData;
  const [commentUser, setCommentUser] = useState({})
  useEffect(() => {
    let isMounted = false;
    const fetchUserComments = async () => {
      const commentUserFetched = await userApi.getUser(userId);
      if (!isMounted) {
        setCommentUser(commentUserFetched);
      }
    }
    fetchUserComments();
    return () => {
      isMounted = true;
    };
  }, [])
  const handleDelete = () => {
    if(window.confirm("Deleting your comment.")){
      deleteComment(postId, userId, commentData?._id)
      alert("Comment Deleted");
    }
  }
  return (
    <div className='comment'>
      <span><b>{commentUser?.data?.firstname} {commentUser?.data?.lastname}</b></span>
      {userId === currentUserId &&
        <div className='commentUtils'>
          <UilPen style={{ cursor: 'pointer' }} />
          <UilTrash style={{ cursor: 'pointer' }} onClick={handleDelete} />
        </div>
      }
      <span className='comment-text'>{comment}</span>
      <span><Moment fromNow>{createdAt}</Moment></span>

    </div>
  )
}

export default CommentsList
