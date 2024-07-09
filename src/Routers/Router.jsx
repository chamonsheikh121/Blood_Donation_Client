// import { Root } from "postcss";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import RootLayout from "../Components/Layout/RootLayout";

const router = createBrowserRouter([
    {
        path:"/",
        element:<RootLayout></RootLayout>,
        children:[
            {
                index:true,
                element:<HomePage></HomePage>
            }
        ]
    }
])

export default router;