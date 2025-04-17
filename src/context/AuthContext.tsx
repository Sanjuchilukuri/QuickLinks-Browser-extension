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
        userName:'',
        userEmail:''
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
        userEmail:''
    });

    const [authType,setAuthType] = useState<AuthType.Github | AuthType.local>(AuthType.local);

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                const u = data.session.user;
                setUser(
                    { 
                        userName: u.user_metadata.full_name || "GitHub User",
                        userEmail: u.email || u.new_email || u.user_metadata.email
                    }
                );
                setAuthType(AuthType.Github);
                setIsAuthenticated(true);
            }
        });

      
        chrome.storage.local.get(["user", "authType", "isAuthenticated"], (result) => {
            if (result.isAuthenticated && result.authType === AuthType.local) {
                setUser({ 
                    userName: result.user.userName,
                    userEmail: result.user.userEmail
                });
                setAuthType(AuthType.local);
                setIsAuthenticated(true);
            }
        });
    }, []);

    const AuthenticateWithGithub = async () => {
        const redirectUrl = chrome.identity.getRedirectURL();
        // alert(JSON.stringify(redirectUrl, null, 2));

        const authUrl = `https://oifjiqvzdvracwfokkrj.supabase.co/auth/v1/authorize?provider=github&redirect_to=${encodeURIComponent(redirectUrl)}`;

        chrome.identity.launchWebAuthFlow({ url: authUrl, interactive: true }, async (redirectResponse) => {
            if (chrome.runtime.lastError || !redirectResponse) {
                // alert(JSON.stringify(chrome.runtime.lastError, null, 2));
                return;
            }

            const url = new URL(redirectResponse);
            const hashParams = new URLSearchParams(url.hash.substring(1));
            const accessToken = hashParams.get("access_token");
            const refreshToken = hashParams.get("refresh_token");

            const { data, error } = await supabase.auth.setSession({
                access_token: accessToken!,
                refresh_token: refreshToken!,
            });

            if (error) {
                // alert(JSON.stringify(error.message));
                return;
            }

            const u = data.session?.user!;
            // setUser({ userName: u?.user_metadata.full_name || "GitHub User" });
            setUser(
                { 
                    userName: u.user_metadata.full_name || "GitHub User",
                    userEmail: u.email || u.new_email || u.user_metadata.email
                }
            );
            setAuthType(AuthType.Github);
            setIsAuthenticated(true);
        });
   
    };

    const logOut = async () => {
        await supabase.auth.signOut();
        chrome.storage.local.clear(() => {
            setUser({ userName: "", userEmail:"" });
            setIsAuthenticated(false);
            setAuthType(AuthType.local);
        });
    }

    const continueWithoutLogin = () => {
        const user = { userName: 'Guest', userEmail : "example@gmail.com" }; 
        chrome.storage.local.set({ user, authType: AuthType.local, isAuthenticated: true }, () => {
            setUser(user);
            setAuthType(AuthType.local);
            setIsAuthenticated(true);
        });
    };

    const isUserAuthenticated = async (): Promise<boolean> => {
       const { data } = await supabase.auth.getSession();
        return !!data.session;
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, user, isUserAuthenticated, authType, continueWithoutLogin, AuthenticateWithGithub, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}