import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { UilTrash } from "@iconscout/react-unicons";

import "./CommentsList.css";
import { deletePostComment,getPostCommentsById } from '../../redux/actions/post.action';


const CommentsList = ({ currentUserId, commentsData, postId }) => {
  const dispatch = useDispatch();

  return (
    <>{commentsData?.map((comment, index) => {
      if (comment.postId === postId) {
        // fetchUserComments(comment)
        return (
          <div key={index} className='comment'>
            <span><b>{comment.firstname} {comment.lastname}</b></span>
            {comment.userId === currentUserId &&
              <div className='comment-utils'>
                <UilTrash style={{ cursor: 'pointer' }} onClick=
                  {() => {
                    if (window.confirm("Deleting your comment.")) {
                      dispatch(deletePostComment(postId, comment.userId, comment._id))
                      alert("Comment Deleted");
                      dispatch(getPostCommentsById(postId))
                    }
                  }}
                />
              </div>
            }
            <span className='comment-text'>{comment.comment}</span>
            <span><Moment fromNow>{comment.createdAt}</Moment></span>
          </div>
        )
      }
    })}

    </>
  )
}

export default CommentsList
