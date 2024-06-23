import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import SearchBooks from "./pages/SearchBooks";
import Admin from "./pages/admin/Admin";
import Book from "./pages/Book";
import LoginAdmin from "./pages/admin/LoginAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [{
            index: true,
            element: <Home />,
        }, {
            path: "searchBooks",
            element: <SearchBooks />
        }, {
            path: "searchBooks/:bookId",
            element: <Book />
        }, {
            path: "registerBooks",
            element: <LoginAdmin />
            }, {
                path: "library",
                element: <RootLayout />,
            },
        ]
    }, {
        path: "admin",
        element: <Admin />
    }, {
        path: "admin/registerBooks",
        element: <LoginAdmin />
    },
]);

export default router;