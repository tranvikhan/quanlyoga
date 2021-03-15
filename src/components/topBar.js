import React, { useEffect, useState } from "react";
import firebase from "firebase";
import "../assets/css/main_page.css";

import logo from "../assets/image/logo.png";
import { FaPlus } from "react-icons/fa";
import { Button } from "reactstrap";

import Notification from "./notification";
import UserProflie from "./userProfile";
import Select from "react-select";
import NewRoute from "./newRoute";
import { useAuth } from "../Firebase";

export default function TopBar() {
  const [myRouteID, setMyRouteID] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    var starCountRef = firebase.database().ref("users").child(currentUser.uid);
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) setMyRouteID(data.myRoute);
      else setMyRouteID(null);
    });
  }, [currentUser.uid]);
  useEffect(() => {
    var starCountRef = firebase.database().ref("routes");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let values = Object.keys(data);
        let labels = Object.values(data);
        let newArray = [];
        for (let i = 0; i < values.length; i++) {
          newArray.push({
            value: values[i],
            label: labels[i].name,
          });
        }
        setOptionsRoutes(newArray);
      } else {
        setOptionsRoutes([]);
      }
    });
  }, []);
  const [optionsRoutes, setOptionsRoutes] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <div class="fixed-top" style={{ zIndex: 10 }}>
        <div className="d-flex bg-white shadow-sm align-items-center">
          <div className="p-2 ">
            <img
              className="ml-3 rounded"
              style={{ width: 35, height: 35 }}
              src={logo}
              alt="your avatar"
            />
          </div>
          <div className="p-2">
            <strong>POTHOLE WARNING</strong>
          </div>
          <div className="p-2 flex-grow-1">
            <div className="search-bar">
              <Select
                placeholder="Tìm tuyến đường"
                value={
                  myRouteID && optionsRoutes
                    ? optionsRoutes.filter(
                        (item) => item.value === myRouteID
                      )[0]
                    : null
                }
                options={optionsRoutes}
                onChange={(item) => {
                  console.log(item);
                  let rootRef = firebase.database().ref();
                  let usersRef = rootRef.child("users");
                  let currentUserRef = usersRef.child(currentUser.uid);
                  currentUserRef.set({
                    myRoute: item.value,
                  });
                  console.log(currentUserRef);
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#f39c12",
                    primary75: "#fac673",
                    primary50: "#fad69d",
                    primary25: "#ffe5bd",
                  },
                })}
              />
            </div>
          </div>
          <div className="p-2">
            <Button
              type="button"
              className="rounded-circle p-0 pb-1 border-0"
              style={{ width: 35, height: 35, backgroundColor: "#f3f2f1" }}
              onClick={toggle}
            >
              <FaPlus size={18} color="#292827" />
            </Button>
          </div>
          <div className="p-2">
            <Notification />
          </div>
          <div className="p-2">
            <UserProflie />
          </div>
        </div>
      </div>
      <NewRoute modal={modal} toggle={toggle} />
    </>
  );
}
