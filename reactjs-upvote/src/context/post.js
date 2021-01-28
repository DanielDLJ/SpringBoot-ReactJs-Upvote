import React, {createContext, useState, useEffect, useContext} from 'react';
import * as post from '../api/post-api';
import AuthContext from "../context/auth";

const PostContext = createContext({});

export const PostProvider = ({children}) => {
  const { loadingDataAuth, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    if(!loadingDataAuth && user != null){
      getPosts(user);
    }
  },[])

  async function getPosts() {
    let response = await post.getPosts(user);
    if (response.error) {
      return response;
    }else{
      setPosts([])
      setPosts(response)
      return true
    }
  }

  async function createPost(content) {
    let response = await post.createPost(user, content);
    if (response.error) {
      return response;
    }else{
      setPosts(response)
      return true
    }
  }

  async function likePost(postId) {
    let response = await post.likePost(user, postId);
    return response
    if (response.error) {

      return false;
    }else{
      return true
    }
  }

  async function disLikePost(postId) {
    let response = await post.disLikePost(user, postId);
    if (response.error) {
      return false;
    }else{
      return true
    }
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        likePost,
        disLikePost,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;