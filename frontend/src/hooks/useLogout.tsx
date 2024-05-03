import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch}:any = useAuthContext()
    const logout = async() => {
        //remove cookie
        const response = await fetch("http://localhost:4000/logout",{
            credentials: 'include',
        })
        const json = await response.json()
        //dispatch
        dispatch({type: "LOGOUT"})
        //remove user from storeage
        localStorage.removeItem("user")
    }
    return {logout}
}

