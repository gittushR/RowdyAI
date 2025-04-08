import axios from "axios"

export const loginUser = async (email:string, password:string) => {
    
    const res = await axios.post('/user/login',{email,password});
    console.log(res);
    
    if(res.status!==200){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}; 
export const signUpUser = async (name:string,email:string, password:string) => {
    
    const res = await axios.post('/user/signup',{name,email,password});
    console.log(res);
    
    if(res.status!==201){
        throw new Error("Unable to SignUp");
    }
    const data = await res.data;
    return data;
}; 

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');
    if(res.status!==200){
        throw new Error("Unable to authenticate user, Login again");
    }
    const data = await res.data;
    return data;
}
export const sendChatReq = async (message:string) => {
    const res = await axios.post('/chat/new',{message});
    if(res.status!==200){
        throw new Error("Unable to send chat message, Login again");
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get('/chat/chats');
    if(res.status!==200){
        throw new Error("Unable to send chat message, Login again");
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete('/chat/delete');
    if(res.status!==200){
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
}

export const userLogout = async () => {
    const res = await axios.get('/user/logout');
    if(res.status!==200){
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
}