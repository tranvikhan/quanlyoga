import React from "react";

import "../assets/css/main_page.css";

import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { protectedPages } from "../router";

export default function LeftSlide() {
  return (
    <div
      className="fixed-top"
      style={{
        backgroundColor: "#f3f2f1",
        width: 250,
        minHeight: "100vh",
        zIndex: 9,
        paddingTop: 70,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <Nav pills vertical>
        {protectedPages.map((route, index) => (
          <NavItem key={index}>
            <NavLink
              to={route.path}
              className="nav-link my-1"
              activeClassName="active"
            >
              <div
                className="mr-3 rounded-circle text-center pt-1"
                style={{
                  display: "inline-block",
                  backgroundColor: "#ffffff",
                  width: 35,
                  height: 35,
                }}
              >
                {<route.icon size={18} />}
              </div>

              <strong>{route.name}</strong>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </div>
  );
}
