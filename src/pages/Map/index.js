import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import firebase from "firebase";
import MyMapComponent from "../../components/mapComponent";
import { useAuth } from "../../Firebase";

export default function Map() {
  const [state, setState] = useState({
    isMarkerShown: true,
  });
  const [datas, setDatas] = useState([]);
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
    if (!myRouteID) return;
    var starCountRef = firebase.database().ref("routes").child(myRouteID);
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDatas(Object.values(data.points).filter((i) => !i.IsFix));
      }
    });
  }, [myRouteID]);
  const handleMarkerClick = () => {
    console.log("marker click");
  };

  return (
    <>
      <Row>
        <Col xl="12">
          <Card>
            <CardBody className="p-1">
              <div style={{ height: "570px" }} className="border rounded">
                <MyMapComponent
                  isMarkerShown={state.isMarkerShown}
                  onMarkerClick={handleMarkerClick}
                  points={datas}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
