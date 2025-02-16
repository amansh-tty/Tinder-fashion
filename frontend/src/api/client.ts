import axios  from 'axios'

const MODE = import.meta.env.VITE_MODE;
const DEV = import.meta.env.VITE_DEV_URL;
const PROD = import.meta.env.VITE_PROD_URL;


export const client = axios.create({
    baseURL: (MODE === "PROD") ?  PROD : DEV ,
    // baseURL: "http://localhost:5000/api"
})