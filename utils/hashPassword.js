import bcryptjs from "bcryptjs";

export default async function hashPassword(password) {
    try{
        if(!password){
            throw new Error("Password is required");
        }
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    }catch(error){
        throw new Error(error.message);}
    }