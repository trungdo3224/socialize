import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Posts.css';
// import { PostsData } from '../../Data/PostsData';
import Post from '../Post/Post';
import { useEffect } from 'react';
import { getTimeLinePosts } from '../../redux/actions/post.action';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading, comments } = useSelector((state) => state.postReducer);



  useEffect(() => {

    dispatch(getTimeLinePosts(user._id));
  }, [])
  if (params.id) posts = posts.filter((post) => post.userId === params.id)
  return (
    <div className="Posts">
      {loading ? <h2>Loading Posts...</h2>
        :
        posts?.map((post, id) => {
          return <Post key={Math.random(id)} comments={comments.filter(comment => comment.postId === post._id)} post={post} />
        })}
    </div>
  )
}

export default Posts