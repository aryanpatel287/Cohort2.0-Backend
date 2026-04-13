import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/shared/pages/Home";
import CreatePost from "./features/post/pages/CreatePost";
import UserProfile from "./features/user/pages/UserProfile";
import Feed from "./features/post/pages/Feed";
import NotFoundPage from "./features/shared/pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                index: true,
                element: <Feed />
            },
            {
                path: 'user/:username',
                element: <UserProfile />
            }
        ]

    },
    {
        path: "/create-post",
        element: <CreatePost />
    },
    {
        path: "/not-found",
        element: <NotFoundPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])