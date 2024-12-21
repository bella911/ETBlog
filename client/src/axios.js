import axios from "axios";
 
const instance = axios.create({
    baseURL: "https://etblog.onrender.com/api"
});

export default instance