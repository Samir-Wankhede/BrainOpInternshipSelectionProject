import {useState} from "react"
import {useAuthContext} from "./useAuthContext"

export const useSignup = () => {
    const [error,setError] = useState<any>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {dispatch}:any = useAuthContext()

    const signup = async (name:string,email:string,password:string,confirmed_password:string,picture_url:string | undefined | null) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/signup",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({name,email,password,confirmed_password,picture_url})
        })
        const json = await response.json()
        

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
            console.log(json.error)
        }
        if (response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth
            dispatch({type: "LOGIN",payload:json})
            setIsLoading(false)
        } 
    }
    return {signup,isLoading,error}
}

