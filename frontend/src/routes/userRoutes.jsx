import Home from "../components/Home/Home";
import About from "../components/About/About";
import Trees from "../components/Trees/Trees";
import ContactUs from "../components/Contact/Contact";
import Donate from "../components/Donate/Donate";
import TreePage from "../components/Trees/TreePage";
import UserProfile from "../components/Profiles/UsersProfiles/UserProfile";
import UserCart from "../components/Profiles/UsersProfiles/UserCart";
import UserInfo from "../components/Profiles/UsersProfiles/UserInfo";
import Cart from "../components/Cart/Cart";
import Logout from "../components/Profiles/Logout";
import Layout from "../components/Layout";
import "../App.css";
const userRoutes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/trees",
                element: <Trees />,
            },
            {
                path: "/trees/:id",
                element: <TreePage />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
            {
                path: "/donate",
                element: <Donate />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/user",
                element: <UserProfile />,
                children: [
                    {
                        path: "",
                        element: <UserInfo />,
                    },
                    {
                        path: "/user/cart",
                        element: <UserCart />,
                    },
                    {
                        path: "/user/logout",
                        element: <Logout />,
                    },
                ],
            },
        ],
    },
];

export default userRoutes;