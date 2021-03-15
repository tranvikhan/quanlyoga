import React from "react";
import { Redirect } from "react-router-dom";
import LeftSlide from "../components/leftSlide";
import TopBar from "../components/topBar";
import { useAuth } from "../Firebase";

export default function ProtectRoute({ children }) {
  const { currentUser } = useAuth();
  return (
    <>
      {!currentUser ? (
        <Redirect
          to={{
            pathname: "/auth/signIn",
          }}
        />
      ) : (
        <>
          <TopBar />
          <div className="d-flex" style={{ marginTop: 50 }}>
            <LeftSlide />
            <div
              className="flex-grow-1 p-3"
              style={{ minHeight: "100vh", marginLeft: 250 }}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}
