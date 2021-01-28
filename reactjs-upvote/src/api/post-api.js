import axios from "axios";

export const getPosts = async (user) => {
  try {
    let result = await axios.post("posts/byUser",user);
    console.log(result.data);
    return result.data;
  } catch (error) {
    switch (error.response === undefined ? 65465 : error.response.status) {
      case 500:
        return {
          error: "Problemas com o servidor.",
        };
      default:
        return {
          error: "Verifique sua conexão com a internet.",
        };
    }
  }
};

export const createPost = async (user, content) => {
  try {
    let dataSend = {
      user: { ...user },
      post: { content: content },
    };
    let result = await axios.post("posts", dataSend);
    console.log("[auth-api createPost]", result.data);
    return result.data;
  } catch (error) {
    console.log("[auth-api error createPost]", error);
    switch (error.response === undefined ? 65465 : error.response.status) {
      case 406: //NOT_ACCEPTABLE empty 
        return {
          error: "Formato do conteúdo é inválido.",
        };
      case 500:
        return {
          error: "Problemas com o servidor.",
        };
      default:
        return {
          error: "Verifique sua conexão com a internet.",
        };
    }
  }
};

export const likePost = async (user, postID) => {
  try {
    let dataSend = {
      user: { ...user },
      post: { id: postID },
    };
    let result = await axios.post("posts/like", dataSend);
    console.log("[auth-api likePost]", result.data);
    return result.data;
  } catch (error) {
    console.log("[auth-api error likePost]", error);
    switch (error.response === undefined ? 65465 : error.response.status) {
      case 406: //NOT_ACCEPTABLE empty 
        return {
          error: "Formato do conteúdo é inválido.",
        };
      case 500:
        return {
          error: "Problemas com o servidor.",
        };
      default:
        return {
          error: "Verifique sua conexão com a internet.",
        };
    }
  }
};

export const disLikePost = async (user, postID) => {
  try {
    let dataSend = {
      user: { ...user },
      post: { id: postID },
    };
    console.log(dataSend)
    let result = await axios.post("posts/dislike", dataSend);
    console.log("[auth-api disLikePost]", result.data);
    return result.data;
  } catch (error) {
    console.log("[auth-api error disLikePost]", error);
    switch (error.response === undefined ? 65465 : error.response.status) {
      case 406: //NOT_ACCEPTABLE empty 
        return {
          error: "Formato do conteúdo é inválido.",
        };
      case 500:
        return {
          error: "Problemas com o servidor.",
        };
      default:
        return {
          error: "Verifique sua conexão com a internet.",
        };
    }
  }
};