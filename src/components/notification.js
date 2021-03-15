import {
  Alert,
  Button,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

export default function Notification() {
  const [popoverNotification, setPopoverNotification] = useState(false);
  const toggleNotification = () => setPopoverNotification(!popoverNotification);
  return (
    <>
      <Button
        id="NotificationIcon"
        type="button"
        className="rounded-circle p-0 pb-1 border-0"
        style={{ width: 35, height: 35, backgroundColor: "#f3f2f1" }}
      >
        <FaBell size={18} color="#292827" />
      </Button>
      <UncontrolledPopover
        placement="bottom"
        trigger="legacy"
        isOpen={popoverNotification}
        target="NotificationIcon"
        toggle={toggleNotification}
      >
        <PopoverHeader>Thông báo</PopoverHeader>
        <PopoverBody
          style={{
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <Alert color="primary">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="secondary">
            Đây là thông báo của tui
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="success">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="danger">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="warning">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="info">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="light">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
          <Alert color="dark">
            Đây là thông báo của tui{" "}
            <Link to="/map" className="alert-link">
              nhấn vào đây để mở
            </Link>
          </Alert>
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
}
