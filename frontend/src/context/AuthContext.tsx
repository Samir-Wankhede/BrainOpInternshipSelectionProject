import {createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext<any>(null)

const authReducer = (state:any,action:any)=>{
    switch(action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}:any) => {

    const [ state , dispatch] = useReducer(authReducer,{
        user:null
    })

    useEffect(()=>{
        //Store Vald user data in local storage
        const item:any = window.localStorage.getItem("user")
        const user = JSON.parse(item)
        if(user){
            dispatch({type:"LOGIN",payload: user})
        }
    },[dispatch])
    //console.log("AuthContext: ",state)

    return (
    <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
    )
}
