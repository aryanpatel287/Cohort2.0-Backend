import { createContext, useState, useEffect } from "react";
import { login, register } from "./services/auth.api";


export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    // const handleLogin = async (username, password) => {
    //     setLoading(true)

    //     try {
    //         const response = await login(username, password)
    //         setUser(response.user)
    //         return response.user
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const handleRegister = async (username, email, password) => {
    //     setLoading(true)

    //     try {
    //         const response = await register(username, email, password)
    //         setUser(response.data)
    //         return response.user
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(true)
    //     }
    // }

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}