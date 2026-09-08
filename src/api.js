import axios from "axios";
export const api=axios.create({baseURL:import.meta.env.VITE_API_URL||"http://localhost:5000/api",withCredentials:true});
api.interceptors.request.use(c=>{const t=localStorage.getItem("sree_token");if(t)c.headers.Authorization=`Bearer ${t}`;return c});
