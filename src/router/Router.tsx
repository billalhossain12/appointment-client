import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AppointmentForm from "../pages/Appointments/AppointmentForm";
import { Layout } from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import QueueList from "../pages/Queue/QueueList";
import { StaffForm } from "../pages/Staff/StaffForm";
import { ServiceForm } from "../pages/Services/ServiceForm";
import Register from "../pages/Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
