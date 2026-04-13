import { createContext, useState } from "react";

export const FollowContext = createContext();

export function FollowProvider({ children }) {

    const [allFollowRecords, setAllFollowRecords] = useState(null)
    const [followerRecords, setFollowerRecords] = useState(null)
    const [followingRecords, setFollowingRecords] = useState(null)
    const [followRequests, setFollowRequests] = useState(null)
    const [loading, setLoading] = useState(false)
    const [allFollowRequests, setAllFollowRequests] = useState(null)

    return (
        <FollowContext.Provider
            value={{
                allFollowRecords, setAllFollowRecords,
                loading, setLoading,
                allFollowRequests, setAllFollowRequests,
                followerRecords, setFollowerRecords,
                followingRecords, setFollowingRecords,
                followRequests, setFollowRequests
            }}>
            {children}
        </FollowContext.Provider>
    )
}