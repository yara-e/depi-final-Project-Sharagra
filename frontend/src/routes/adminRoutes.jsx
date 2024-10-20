import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminProfile from "../components/Profiles/AdminProfile/AdminProfile";
import AdminDashboard from "../components/Profiles/AdminProfile/AdminDashboard";
import UpdateTrees from "../components/Profiles/AdminProfile/UpdateTrees";
import KnowUsers from "../components/Profiles/AdminProfile/KnowUsers";
import Orders from "../components/Profiles/AdminProfile/Orders";
import EditTree from "../components/Profiles/AdminProfile/EditTree/EditTree";
import AddTree from "../components/Profiles/AdminProfile/AddTree/AddTree";
import ALogout from '../components/Profiles/ALogout';
import AdminLogin from "../components/Profiles/AdminProfile/AdminLogin/AdminLogin";
import { isAdmin } from '../utils/auth';  

 
const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/profile",
    element: isAdmin() ? <AdminProfile /> : <Navigate to="/admin" />,
    children: [
      {
        path: "/admin/profile/dashboard",
        element: isAdmin() ? <AdminDashboard /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/updateTrees",
        element: isAdmin() ? <UpdateTrees /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/informationUser",
        element: isAdmin() ? <KnowUsers /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/orders",
        element: isAdmin() ? <Orders /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/editTree/:id",
        element: isAdmin() ? <EditTree /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/addTree",
        element: isAdmin() ? <AddTree /> : <Navigate to="/admin" />,
      },
      {
        path: "/admin/profile/logout",
        element: isAdmin() ? <ALogout /> : <Navigate to="/admin" />,
      },
    ],
  },
];

export default adminRoutes;
