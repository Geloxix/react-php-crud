import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

//layout
import Layout from "./layout/Layout";

//zustand stm
import { usefetchUserStore } from "./features/hooks/store";

//pages
import HomePage from "./pages/HomePage";
import UsersPage from "./features/pages/UsersPage";

const App = () => {
    //functions and varables from store
    const { users, fetchUsers } = usefetchUserStore();

    useEffect(() => {
        fetchUsers();
    },[]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/users',
                    element: <UsersPage users={users}/>,
                }
            ]
        }
    ]);



    return <RouterProvider router={router} />;
};

export default App;
