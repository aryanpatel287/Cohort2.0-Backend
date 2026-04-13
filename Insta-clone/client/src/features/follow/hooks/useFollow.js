import { useContext } from "react"
import { FollowContext } from "../follow.context"
import { acceptFollowRequest, followUser, getAllFollowRecords, getAllFollowRequests, rejectFollowRequest, unfollowUser } from "../services/follow.api"
import { UserContext } from "../../user/user.context"

export function useFollow() {
    const followContext = useContext(FollowContext)

    const { allUsers, setAllUsers } = useContext(UserContext)
    const {
        allFollowRecords, setAllFollowRecords,
        loading, setLoading,
        allFollowRequests, setAllFollowRequests,
        followerRecords, setFollowerRecords,
        followingRecords, setFollowingRecords,
        followRequests, setFollowRequests
    } = followContext

    async function handleFollowUser(userId) {
        setLoading(true)
        const response = await followUser(userId)
        setLoading(false)
        return response.followRecord
    }

    async function handleUnfollowUser(userId) {
        setLoading(true)
        const response = await unfollowUser(userId)
        setLoading(false)
        return response
    }

    async function handleAllFollowRecords() {
        setLoading(true)
        const response = await getAllFollowRecords()
        setAllFollowRecords(response.allFollowRecords)
        setFollowerRecords(response.allFollowRecords.followerRecords)
        setFollowingRecords(response.allFollowRecords.followingRecords)
        setLoading(false)
    }

    async function handleAllFollowRequests() {
        setLoading(true)
        const response = await getAllFollowRequests()
        setAllFollowRequests(response.allFollowRequests)
        setLoading(false)
    }

    async function handleAcceptFollowRequest(followRecordId) {
        setLoading(true)
        const response = await acceptFollowRequest(followRecordId)
        await handleAllFollowRequests()
        await handleAllFollowRecords()
        setLoading(false)
    }

    async function handleRejectFollowRequest(followRecordId) {
        setLoading(true)
        const response = await rejectFollowRequest(followRecordId)
        await handleAllFollowRequests()
        await handleAllFollowRecords()
        setLoading(false)
    }

    return {
        allFollowRecords,
        followerRecords,
        followingRecords,
        loading,
        allFollowRequests,
        setAllFollowRequests,
        handleAllFollowRecords,
        handleFollowUser,
        handleUnfollowUser,
        handleAllFollowRequests,
        handleAcceptFollowRequest,
        handleRejectFollowRequest
    }
}