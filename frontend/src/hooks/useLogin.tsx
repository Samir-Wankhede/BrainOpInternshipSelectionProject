import {useState} from "react"
import {useAuthContext} from "./useAuthContext"

export const useLogin = () => {
    const [error,setError] = useState<any>(null)
    const [isLoading,setIsLoading] = useState(false)
    const {dispatch}:any = useAuthContext()

    const login = async (email:string,password:string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/signin",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({email,password})
        })

        const json = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth
            dispatch({type: "LOGIN",payload:json})
            setIsLoading(false)
            
        } 
    }
    return {login,isLoading,error}
}