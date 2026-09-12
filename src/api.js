import axios from "axios";
// If VITE_API_URL isn't set to a real backend, fall back to whatever host the
// page itself was loaded from (so opening the site via a LAN IP, e.g.
// http://192.168.10.35:5173, correctly talks to that same machine's backend
// on port 5000 instead of always trying "localhost").
const envApiUrl = import.meta.env.VITE_API_URL;
const fallbackApiUrl = `${window.location.protocol}//${window.location.hostname}:5000/api`;
const resolvedApiUrl = envApiUrl && !envApiUrl.includes("localhost") ? envApiUrl : fallbackApiUrl;
export const api=axios.create({baseURL:resolvedApiUrl,withCredentials:true});
api.interceptors.request.use(c=>{const t=localStorage.getItem("sree_token");if(t)c.headers.Authorization=`Bearer ${t}`;return c});
