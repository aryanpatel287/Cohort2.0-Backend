import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import { getAllUsers, getMe, getUser } from "../services/user.api";
import { UserContext } from "../user.context";

export function useUser() {


    const { user, setUser } = useContext(AuthContext)
    const { allUsers, setAllUsers, loading, setLoading, requestedUser, setRequestedUser } = useContext(UserContext)


    const handleGetMe = async () => {
        setLoading(true)

        try {
            const response = await getMe()
            setUser(response.user)
        } catch (error) {
            console.log(error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const handleGetAllUsers = async () => {
        setLoading(true)

        try {
            const response = await getAllUsers()
            setAllUsers(response.allUsers)
        } catch (error) {
            console.log(error)
            setAllUsers(null)
        } finally {
            setLoading(false)
        }
    }

    const handleGetUser = async (username) => {
        setLoading(true)

        try {
            const response = await getUser(username)
            setRequestedUser(response.userDetails)
            return response.userDetails
        } catch (error) {
            console.log(error)
            setRequestedUser(null)
            return null
        } finally {
            setLoading(false)
        }
    }

    return { handleGetMe, handleGetAllUsers, handleGetUser, user, allUsers, loading, requestedUser }
}
