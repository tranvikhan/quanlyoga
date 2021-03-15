import React from "react";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";

export default function About() {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Giới thiệu</CardTitle>
            <h6 className="mb-3">
              <i>Phần mềm đang trong giai đoạn phát triển</i>
            </h6>
            <p>Admin: Trần Vi Khan</p>
            <p>Email: tranvikhan@gmail.com</p>
            <p>Sdt: 0974184717</p>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
