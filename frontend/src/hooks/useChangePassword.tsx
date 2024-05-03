import {useState} from "react"

export const useChangePassword = () => {
    const [error,setError] = useState<any>(null)
    const [isLoading,setIsLoading] = useState(false)
    const [isChanged,setIsChanged] = useState<boolean>(false)
    const changepassword = async (oldpassword:string,newpassword:string,confirmed_newpassword:string) => {
        setIsLoading(true)
        setIsChanged(false)
        setError(null)
        try{
          const response = await fetch("http://localhost:4000/changepassword",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            credentials: 'include',
            body: JSON.stringify({oldpassword,newpassword,confirmed_newpassword})
        })
        const json = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            setIsLoading(false)
            alert(json.message+"!")
            setIsChanged(true)
        }   
        }
        catch(error){
            console.log(error)
        }
    }
    return {changepassword,isLoading,error,isChanged}
}