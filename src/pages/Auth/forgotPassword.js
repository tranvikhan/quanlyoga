import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Firebase";
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
import Loader from "../../components/loader";

export default function ForgotPassword() {
  const emailValue = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const successMessage = "Vui lòng kiểm tra email!";
  const history = useHistory();
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkFail()) {
      return history.push("/auth/signIn");
    }
    try {
      setMessage("");
      setLoading(true);
      await resetPassword(emailValue.current);
      setMessage(successMessage);
    } catch (e) {
      setLoading(false);
      addToast(e.message, { appearance: "error" });
      return setMessage("Không thể khôi phục mật khẩu");
    }
    setLoading(false);
  };
  const checkFail = () => {
    return message !== successMessage;
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
              <Col md={6} className="d-none d-md-block px-0">
                <HelloCarousel />
              </Col>
              <Col md={6} className="p-5">
                {loading && <Loader />}
                <CardTitle tag="h5" className="text-center  mb-3">
                  KHÔI PHỤC MẬT KHẨU
                </CardTitle>
                {message !== "" && (
                  <Alert color={checkFail() ? "danger" : "success"}>
                    {message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  {checkFail() && (
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
                  )}

                  <Button block color="primary">
                    {checkFail() ? "Lấy mật khẩu" : "Trở lại đăng nhập"}
                  </Button>
                </Form>
                <p className="text-center text-muted mt-3">
                  Bạn chưa có tài khoản? <Link to="/auth/signUp">Đăng ký</Link>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
