import React from "react";
import {
  FaMapMarkedAlt,
  FaChartPie,
  FaCog,
  FaTrafficLight,
  FaInfoCircle,
} from "react-icons/fa";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ProtectRoute from "./protectRoute";
import AuthRoute from "./authRoute";

// auth
import SignIn from "../pages/Auth/signIn";
import SignUp from "../pages/Auth/signUp";
import ForgotPassword from "../pages/Auth/forgotPassword";
//pages
import Map from "../pages/Map";
import Dashboard from "../pages/Dashboard";
import MyRoute from "../pages/MyRoute";
import Setting from "../pages/Setting";
import About from "../pages/About";

export const authPages = [
  {
    path: "/auth/signIn",
    name: "Đăng nhập",
    icon: null,
    component: <SignIn />,
  },
  {
    path: "/auth/signUp",
    name: "Đăng ký",
    icon: null,
    component: <SignUp />,
  },
  {
    path: "/auth/resetPassword",
    name: "Lấy lại mật khẩu",
    icon: null,
    component: <ForgotPassword />,
  },
];
export const protectedPages = [
  {
    path: "/map",
    name: "Bản đồ",
    icon: (props) => <FaMapMarkedAlt {...props} />,
    component: <Map />,
  },
  {
    path: "/dashboard",
    name: "Thống kê",
    icon: (props) => <FaChartPie {...props} />,
    component: <Dashboard />,
  },
  {
    path: "/route",
    name: "Tuyến đường",
    icon: (props) => <FaTrafficLight {...props} />,
    component: <MyRoute />,
  },
  {
    path: "/setting",
    name: "Cài đặt",
    icon: (props) => <FaCog {...props} />,
    component: <Setting />,
  },
  {
    path: "/about",
    name: "Giới thiệu",
    icon: (props) => <FaInfoCircle {...props} />,
    component: <About />,
  },
];

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect
            to={{
              pathname: "/map",
            }}
          />
        </Route>
        <Route path="/quanlyoga" exact>
          <Redirect
            to={{
              pathname: "/map",
            }}
          />
        </Route>
        {authPages.map((route, index) => {
          return (
            <Route key={index} path={route.path}>
              <AuthRoute>{route.component}</AuthRoute>
            </Route>
          );
        })}
        {protectedPages.map((route, index) => {
          return (
            <Route key={index + authPages.length} path={route.path}>
              <ProtectRoute>{route.component}</ProtectRoute>
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
