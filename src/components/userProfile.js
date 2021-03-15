import { useAuth } from "../Firebase";
import React, { useState } from "react";

import "../assets/css/main_page.css";
import avatarDef from "../assets/image/avatarDefault.jpg";

import { FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import {
  Button,
  PopoverBody,
  Nav,
  NavItem,
  Media,
  UncontrolledPopover,
} from "reactstrap";
import { Link } from "react-router-dom";

export default function UserProflie() {
  const { currentUser, signOut } = useAuth();
  const [popoverUserInfo, setPopoverUserInfo] = useState(false);
  const toggleUserInfo = () => setPopoverUserInfo(!popoverUserInfo);
  return (
    <>
      <Button
        id="userAvatar"
        type="button"
        className="rounded-circle p-0 pb-1 border-0"
        style={{ width: 35, height: 35, backgroundColor: "#f3f2f1" }}
      >
        <img
          className="rounded-circle border border-1 border-secondary mr-3"
          style={{ width: 35, height: 35 }}
          src={currentUser.photoURL ? currentUser.photoURL : avatarDef}
          alt="your avatar"
          id="userAvatar"
        />
      </Button>

      <UncontrolledPopover
        placement="bottom"
        trigger="legacy"
        isOpen={popoverUserInfo}
        target="userAvatar"
        toggle={toggleUserInfo}
      >
        <PopoverBody>
          <Media
            className="mt-2 mb-4 px-2 pt-0 pb-3 border-bottom"
            style={{ minWidth: 250 }}
          >
            <Media left middle href="#">
              <img
                className="rounded-circle border border-1 border-secondary mr-2"
                style={{ width: 43, height: 43 }}
                src={currentUser.photoURL ? currentUser.photoURL : avatarDef}
                alt="your avatar"
              />
            </Media>
            <Media body className="p0">
              <Media heading className="h6 mb-0">
                {currentUser.displayName}
              </Media>
              <small>{currentUser.email}</small>
            </Media>
          </Media>
          <Nav pills vertical>
            <NavItem>
              <Link to="/" className="nav-link my-1">
                <div
                  className="mr-3 rounded-circle text-center pt-1"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f3f2f1",
                    width: 35,
                    height: 35,
                  }}
                >
                  <FaUserAlt size={18} />
                </div>

                <strong>Thông tin</strong>
              </Link>
            </NavItem>

            <NavItem>
              <Link
                to="/auth/signIn"
                onClick={() => {
                  signOut();
                }}
                className="nav-link my-1 "
              >
                <div
                  className="mr-3 rounded-circle text-center pt-1"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f3f2f1",
                    width: 35,
                    height: 35,
                  }}
                >
                  <FaSignOutAlt size={18} />
                </div>

                <strong>Đăng xuất</strong>
              </Link>
            </NavItem>
          </Nav>
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}
