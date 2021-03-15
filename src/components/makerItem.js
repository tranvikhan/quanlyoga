import React, { useEffect, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import {
  Card,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  Button,
  Badge,
} from "reactstrap";

export default function MakerItem(props) {
  const [isChange, setChange] = useState(false);
  const [Lat, setLat] = useState(0);
  const [Lng, setLng] = useState(0);
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (props.Lat) setLat(props.Lat);
    if (props.Lng) setLng(props.Lng);
    if (props.Description) setDescription(props.Description);
    else setDescription("");
  }, [props]);
  return (
    <Card className="mt-3 shadow-none rounded makerItem">
      <CardBody>
        <Form>
          <Row>
            <Col xs={1} className="p-1 text-center pt-2">
              <Badge color={!isChange ? "success" : "warning"} pill>
                {props.stt}
              </Badge>
            </Col>
            <Col xs={3} className="p-1">
              <Input
                type="number"
                name="Lat"
                value={Lat}
                placeholder="105.575268"
                step=".000001"
                onChange={(e) => {
                  setLat(e.target.value);
                  setChange(true);
                }}
              />
            </Col>
            <Col xs={3} className="p-1">
              <Input
                type="number"
                step=".000001"
                value={Lng}
                name="Lng"
                placeholder="9.12546"
                onChange={(e) => {
                  setLng(e.target.value);
                  setChange(true);
                }}
              />
            </Col>
            <Col xs={4} className="p-1">
              <Input
                type="text"
                placeholder="nhập ghi chú"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setChange(true);
                }}
                value={description}
              />
            </Col>
            <Col xs={1} className="p-1 text-center">
              <Button
                type="button"
                className="rounded-circle p-0 pb-1 border-0"
                style={{ width: 35, height: 35, backgroundColor: "#f3f2f1" }}
                onClick={() => {
                  if (!isChange) {
                    if (props.onDelete) props.onDelete(props.stt);
                  } else {
                    if (props.onUpdate)
                      props.onUpdate({
                        stt: props.stt,
                        Lat: parseFloat(Lat),
                        Lng: parseFloat(Lng),
                        Description: description,
                      });
                    setChange(false);
                  }
                }}
              >
                {!isChange ? (
                  <FaTrash size={18} color="#e74c3c" />
                ) : (
                  <FaSave size={18} color="#27ae60" />
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
