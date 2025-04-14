import { createContext, ReactNode, useState } from "react";
import { AuthType } from "../enum";
import { IUser } from "../interfaces/IUser";

interface IAuthContext{
    user:IUser,
    authType: AuthType.Github | AuthType.local,
    isAuthenticated:boolean;
    isUserAuthenticated:() => Promise<boolean>,
    continueWithoutLogin:()=> void,
    AuthenticateWithGithub:() => void
}

export const AuthContext = createContext<IAuthContext>({
    user:{
        userName:''
    },
    authType:AuthType.local,
    isAuthenticated:false,
    isUserAuthenticated:async () => false,
    continueWithoutLogin:()=>{},
    AuthenticateWithGithub:()=>{}
});

export default function AuthContextProvider({children} : {children : ReactNode}){

    const [user,setUser] = useState<IUser>({
        userName:'',
    });

    const [authType,setAuthType] = useState<AuthType.Github | AuthType.local>(AuthType.local);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const AuthenticateWithGithub = () => {
        
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
        <AuthContext.Provider value={{isAuthenticated, user, isUserAuthenticated, authType, continueWithoutLogin, AuthenticateWithGithub}}>
            {children}
        </AuthContext.Provider>
    )
}