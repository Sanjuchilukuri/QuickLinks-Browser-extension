import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthType } from "../enum";
import { IUser } from "../interfaces/IUser";
import { supabase } from "../supabaseClient";

interface IAuthContext{
    user:IUser,
    authType: AuthType.Github | AuthType.local,
    isAuthenticated:boolean;
    isUserAuthenticated:() => Promise<boolean>,
    continueWithoutLogin:()=> void,
    AuthenticateWithGithub:() => void,
    logOut:() => void
}

export const AuthContext = createContext<IAuthContext>({
    user:{
        userName:''
    },
    authType:AuthType.local,
    isAuthenticated:false,
    isUserAuthenticated:async () => false,
    continueWithoutLogin:()=>{},
    AuthenticateWithGithub:()=>{},
    logOut:()=>{}
});

export default function AuthContextProvider({children} : {children : ReactNode}){


    const [user,setUser] = useState<IUser>({
        userName:'',
    });

    const [authType,setAuthType] = useState<AuthType.Github | AuthType.local>(AuthType.local);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    useEffect( () => {
        // chrome.storage.local.get(["user","authType","isAuthenticated"], (result) => {
        //     if( result.isAuthenticated && result.authType == AuthType.local )
        //     {
        //         setUser({
        //             userName:result.user.userName
        //         });
        //         setAuthType(AuthType.local);
        //         setIsAuthenticated(result.isAuthenticated);
        //     }
        // });
    },[])

    const AuthenticateWithGithub = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: chrome.identity.getRedirectURL(),
            },
        })
        if(error){
            alert("error" + error);
        }
        else{
            console.log(data);
        }
        await chrome.tabs.create({ url: data.url! });
    }

    const logOut = async () => {
        chrome.storage.local.clear(() => {
            setUser({
                userName:""
            });
            setIsAuthenticated(false);
            setAuthType(AuthType.local);
        });
    }

    const continueWithoutLogin = () => {
        const user = { userName: 'Guest' }; 
        chrome.storage.local.set({ user, authType: AuthType.local, isAuthenticated: true }, () => {
            setUser(user);
            setAuthType(AuthType.local);
            setIsAuthenticated(true);
        });
    };

    const isUserAuthenticated = async (): Promise<boolean> => {
        return new Promise((resolve) => {
            chrome.storage.local.get(['user', 'authType', 'isAuthenticated'], (result) => {
                const isAuth = !!result.isAuthenticated;
                resolve(isAuth);
            });
        });
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, user, isUserAuthenticated, authType, continueWithoutLogin, AuthenticateWithGithub, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}