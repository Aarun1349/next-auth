
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getUserData = (request:NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value ||'';
        if(!token){
            throw new Error("user is not logged in")     
        }
        const userData:any = jwt.verify(token,process.env.TOKEN_SECRET!)
        return userData.id;
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}