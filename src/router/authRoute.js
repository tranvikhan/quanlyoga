import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../Firebase";

export default function AuthRoute({ children }) {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
}
