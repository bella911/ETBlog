import axios from "axios";
 
const instance = axios.create({
    // baseURL: "http://localhost:5000/api"
    // baseURL: "https://etblog.onrender.com/api"
    baseURL: "https://etblog.bella.com.et/api"
    
});

export default instance