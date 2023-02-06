import axios from "axios";


const coreApi = axios.create({
    baseURL: "http://localhost:3000"
    // baseURL: "fyty-tournament-backend-production.up.railway.app"
});

export default coreApi;