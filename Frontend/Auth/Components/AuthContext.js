import { createContext } from "react";
export const AuthContext=createContext({
    userName:null,
    isLogin:false,
    login:()=>{},
    logout:()=>{}
})