import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-2024-49fc9/us-central1/api",
        baseURL:"https://api-iy2y4kumyq-uc.a.run.app"
    });
  
  export {axiosInstance};

  