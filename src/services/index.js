import axios from "../axios";

export const register_API = async (user) => {
    await axios.post("/auth/signup", user).then((res) => res.data).catch(error=>{throw error.response.data});
};
