import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {

    const [allUsers, setAllUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [requestedUser, setRequestedUser] = useState(null)

    return (
        <UserContext.Provider value={{ allUsers, setAllUsers, loading, setLoading, requestedUser, setRequestedUser }}>
            {children}
        </UserContext.Provider>
    )
}