import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { useToasts } from "react-toast-notifications";

import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Input,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Alert,
} from "reactstrap";
import FileUploader from "./fileUpload";
import MyMapComponent from "./mapComponent";
import classnames from "classnames";
import * as XLSX from "xlsx";
import MakerItem from "./makerItem";

export default function NewRoute(props) {
  const [activeTab, setActiveTab] = useState("1");
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [message, setMessage] = useState({
    type: "danger",
    ms: "",
  });
  const [data, setData] = useState([]);
  const { addToast } = useToasts();

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleMarkerClick = () => {};
  useEffect(() => {
    setData([]);
    setRouteName("");
    setRouteDescription("");
  }, [props.modal]);

  useEffect(() => {
    if (message.ms !== "") {
      var timeout = setTimeout(() => {
        setMessage({ ...message, ms: "" });
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [message]);

  return (
    <Modal isOpen={props.modal} toggle={props.toggle} fullscreen="sm" size="xl">
      <ModalHeader toggle={props.toggle}>Thêm tuyến đường mới</ModalHeader>
      <ModalBody>
        {message.ms !== "" && <Alert color={message.type}>{message.ms}</Alert>}
        <Row>
          <Col xl={4}>
            <Form>
              <FormGroup>
                <Label for="nameInput">Tên tuyến đường</Label>

                <Input
                  type="text"
                  name="text"
                  id="nameInput"
                  value={routeName}
                  onChange={(e) => {
                    setRouteName(e.target.value);
                  }}
                  required
                  placeholder="nhập tên tuyến đường"
                />
              </FormGroup>

              <FormGroup>
                <Label for="desriptionInput">Mô tả</Label>

                <Input
                  type="textarea"
                  value={routeDescription}
                  onChange={(e) => {
                    setRouteDescription(e.target.value);
                  }}
                  name="text"
                  id="desriptionInput"
                  placeholder="nhập mô tả"
                />
              </FormGroup>
            </Form>
            <div class="mb-1">
              <FileUploader
                onFileUpload={(files) => {
                  if (files[0]) {
                    let f = files[0];
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      // evt = on_file_select event
                      /* Parse data */
                      const bstr = evt.target.result;
                      const wb = XLSX.read(bstr, { type: "binary" });
                      /* Get first worksheet */
                      const wsname = wb.SheetNames[0];
                      const ws = wb.Sheets[wsname];
                      /* Convert array of arrays */
                      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                      /* Update state */
                      let a = data.map((row) => ({ Lat: row[0], Lng: row[1] }));
                      console.log(a);
                      setData(a);
                    };
                    reader.readAsBinaryString(f);
                  } else {
                    setData([]);
                  }
                }}
              />
            </div>
          </Col>

          <Col xl={8}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Bản đồ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Danh sách điểm tọa độ
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div style={{ height: "410px" }} className="pt-1">
                  <MyMapComponent
                    isMarkerShown={true}
                    onMarkerClick={handleMarkerClick}
                    points={data}
                  />
                </div>
              </TabPane>
              <TabPane tabId="2">
                <Row className="px-4 border-bottom mx-0 font-weight-bold">
                  <Col xs={1} className="p-1">
                    Stt
                  </Col>
                  <Col xs={3} className="p-1">
                    Lat
                  </Col>
                  <Col xs={3} className="p-1">
                    Lng
                  </Col>
                  <Col xs={3} className="p-1">
                    Ghi chú
                  </Col>
                  <Col xs={2} className="text-right p-1">
                    Thao tác
                  </Col>
                </Row>
                <div
                  style={{ height: "377px", overflowY: "auto" }}
                  className="pt-1"
                >
                  {data.map((item, index) => (
                    <MakerItem
                      Lat={item.Lat}
                      Lng={item.Lng}
                      key={index}
                      Description={item.Description && item.Description}
                      stt={index + 1}
                      onDelete={(stt) => {
                        let newData = data.filter(
                          (item, index) => index !== stt - 1
                        );
                        setData(newData);
                        setMessage({
                          type: "info",
                          ms: `Đã xóa điểm số ${stt} khỏi danh sách`,
                        });
                        addToast(`Đã xóa điểm số ${stt} khỏi danh sách`, {
                          appearance: "success",
                        });
                      }}
                      onUpdate={(newItem) => {
                        let newData = data.map((item, index) =>
                          newItem.stt - 1 !== index ? item : newItem
                        );
                        setData(newData);
                        console.log(newData);
                        setMessage({
                          type: "info",
                          ms: `Đã cập nhật điểm số ${newItem.stt}`,
                        });
                        addToast(`Đã cập nhật điểm số ${newItem.stt}`, {
                          appearance: "success",
                        });
                      }}
                    />
                  ))}
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          Hủy
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (routeName === "") {
              setMessage({ type: "danger", ms: "Tên tuyến đường bị trống" });
              addToast("Tên tuyến đường bị trống", {
                appearance: "error",
              });
              return;
            }
            if (data.length === 0) {
              setMessage({ type: "danger", ms: "Không có điểm nào được thêm" });
              addToast("Không có điểm nào được thêm", {
                appearance: "error",
              });
              return;
            }
            let rootRef = firebase.database().ref();
            let storesRef = rootRef.child("routes");
            let newStoreRef = storesRef.push();
            newStoreRef.set({
              name: routeName,
              description: routeDescription,
              points: null,
              createAt: firebase.firestore.Timestamp.now(),
              updateAt: firebase.firestore.Timestamp.now(),
            });
            data.map((item) => {
              let newPointRef = newStoreRef.child("points");
              let newPoint = newPointRef.push();
              newPoint.set({
                ...item,
                Description: item.Description ? item.Description : "",
                IsFix: false,
                fixAt: null,
                createAt: firebase.firestore.Timestamp.now(),
                updateAt: firebase.firestore.Timestamp.now(),
                stt: null,
              });
              return item;
            });
            addToast("Đã thêm mới thành công tuyến đường: " + routeName, {
              appearance: "success",
            });
            props.toggle();
          }}
        >
          Lưu
        </Button>
      </ModalFooter>
    </Modal>
  );
}
