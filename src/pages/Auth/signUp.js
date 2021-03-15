import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import HelloCarousel from "../../components/helloCarousel";
import { useAuth } from "../../Firebase";
import Loader from "../../components/loader";

export default function SignUp() {
  const emailValue = useRef();
  const passwordValue = useRef();
  const rePasswordValue = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const { signUp } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordValue.current.length < 6) {
      addToast("Mật khẩu cần dài hơn 6 ký tự", { appearance: "error" });
      return setError("Mật khẩu cần dài hơn 6 ký tự");
    }
    if (passwordValue.current !== rePasswordValue.current) {
      addToast("Mật khẩu không trùng khớp", { appearance: "error" });
      return setError("Mật khẩu không trùng khớp");
    }

    try {
      setError(null);
      setLoading(true);
      await signUp(emailValue.current, passwordValue.current);
    } catch (e) {
      setLoading(false);
      addToast(e.message, { appearance: "error" });
      return setError("Không thể đăng ký");
    }
    setLoading(false);
  };
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "800px" }}>
        <Card className="shadow rounded">
          <CardBody className="p-0">
            <Row className="w-100 m-0">
              <Col md="6" className="d-none d-md-block px-0">
                <HelloCarousel />
              </Col>
              <Col md={6} className="p-5">
                {loading && <Loader />}
                <CardTitle tag="h5" className="text-center  mb-3">
                  ĐĂNG KÝ
                </CardTitle>
                {error && <Alert color="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="form_email">Địa chỉ email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="form_email"
                      placeholder=""
                      onChange={(e) => {
                        emailValue.current = e.target.value;
                      }}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="form_password">Mật khẩu</Label>
                    <Input
                      type="password"
                      name="password"
                      id="form_password"
                      placeholder=""
                      onChange={(e) => {
                        passwordValue.current = e.target.value;
                      }}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="form_re_password">Nhập lại mật khẩu</Label>
                    <Input
                      type="password"
                      name="re_password"
                      id="form_re_password"
                      placeholder=""
                      onChange={(e) => {
                        rePasswordValue.current = e.target.value;
                      }}
                      required
                    />
                  </FormGroup>
                  <Button block color="primary">
                    Đăng ký
                  </Button>
                </Form>
                <p className="text-center text-muted mt-3">
                  Bạn đã có tài khoản? <Link to="/auth/signIn"> Đăng nhập</Link>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
