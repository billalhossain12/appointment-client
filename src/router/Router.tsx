import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AppointmentForm from "../pages/Dashboard/AppointmentForm";
import { Layout } from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import QueueList from "../pages/Dashboard/QueueList";
import { StaffForm } from "../pages/Dashboard/StaffForm";
import { ServiceForm } from "../pages/Dashboard/ServiceForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'appointments',
        element:<AppointmentForm/>
      },
      {
        path:'queues',
        element:<QueueList/>
      },
      {
        path:'staff',
        element:<StaffForm/>
      },
      {
        path:'services',
        element:<ServiceForm/>
      },
    ]
  },
]);
