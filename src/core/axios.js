import axios from "axios";


const coreApi = axios.create({
    // baseURL: "http://localhost:3000"
    baseURL: "https://fyty-tournament-backend-production.up.railway.app"
});

export default coreApi;