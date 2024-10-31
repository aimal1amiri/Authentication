import {create} from 'zustand';
import axios from 'axios';


const API_URL ="http://localhost:5000/api/auth";

axios.defaults.withCredentials = true; //every single request -axios- will put the cookie into the request header
export const useAuthenticationStore = create((set) =>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuthentication:true,

    signup: async (email, password, name) => {
        set({isLoading:true, error:null});
        try {
            const response= await axios.post(`${API_URL}/signup`, {email,password,name});
            set({user:response.data.user, isAuthenticated:true, isLoading:false});
        } catch (error) {
            set({error:error.response.data.message || "Error signing up", isLoading:false});
            
            throw error;
        }
    },

    verifyEmailDigits: async (code) => {
        set({isLoading: true, error:null});
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code}); //in the backend, authenticatio-controller, we are getting as a -code-. that is why i also wrote there. and this is the way that you can destructure from -req.body- .
            set({user:response.data.user, isAuthenticated: true, isLoading:false});

            return response.data;

        } catch (error) {
            set({error: error.response.data.message || "Error verifying email", isLoading:false});
            throw error;
        }
    },

    checkUserAuthentication: async() => {
        set({isCheckingUserAuth: true, error:null })

        try {
            const response = await axios.get(`${API_URL}/user-auth-checking`);
            set({user: response.data.user, isCheckingUserAuth:false, isAuthenticated:true});

        } catch (error) {
            set({error: error.response.data.message, isCheckingUserAuth:false, isAuthenticated:false});
        }
    }
}))

