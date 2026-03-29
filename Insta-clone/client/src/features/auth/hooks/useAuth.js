import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../services/auth.api";

export function useAuth() {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        const response = await register(username, email, password)

        setUser(response.user)

        setLoading(false)
    }

    const handleLogin = async (username, password) => {
        setLoading(true)

        const response = await login(username, password)

        setUser(response.user)

        setLoading(false)
    }

    return { user, loading, handleLogin, handleRegister }
}