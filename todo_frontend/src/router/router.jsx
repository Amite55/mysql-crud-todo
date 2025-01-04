import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddStudent from "../pages/AddStudent";
import Details from "../pages/Details";
import Edit from "../pages/Edit";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/addStudent",
          element: <AddStudent/>
        },
        {
          path: "/studentDetails/:id",
          element: <Details/>
        },
        {
          path: "/edit/:id",
          element: <Edit/>
        }
      ]
    },
  ]);

export default router;