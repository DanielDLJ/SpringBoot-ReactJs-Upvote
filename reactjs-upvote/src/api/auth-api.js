import axios from "axios";

export const loginUser = async ( user ) => {
  try {
    let result = await axios.post("auth", user);
    return result.data;
  } catch (error) {
    switch (error.response == undefined ? 65465 : error.response.status) {
      case 401: //UNAUTHORIZED user not found or wrong password
      case 406: //NOT_ACCEPTABLE empty (username or password)
        return {
          error: "Formato de username ou senha inválido."
        };
      case 500:
        return {
          error: "Problemas com o servidor."
        };
      default:
        return {
          error: "Verifique sua conexão com a internet."
        };
    }
  }
};

export const register = async (user) => {
  try {
    let result = await axios.post("users", user);
    console.log("[auth-api register result]",result.data)
    return result.data;
  } catch (error) {
    console.log("[auth-api error register]", error)
    switch (error.response == undefined ? 65465 : error.response.status) {
      case 406: //NOT_ACCEPTABLE empty (username or password)
        return {
          error: "Formato de username ou senha inválido."
        };
      case 409: //CONFLICT
        return {
          error: "Username ja existe."
        };
      case 500:
        return {
          error: "Problemas com o servidor."
        };
      default:
        return {
          error: "Verifique sua conexão com a internet."
        };
    }
  }
};