import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, useAuth } from "../../Firebase";
import firebase from "firebase/app";
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
import { StyledFirebaseAuth } from "react-firebaseui";
import HelloCarousel from "../../components/helloCarousel";
import Loader from "../../components/loader";

export default function SignIn() {
  const emailValue = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const passwordValue = useRef();
  const { signIn } = useAuth();
  const { addToast } = useToasts();
  // Configure FirebaseUI.
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        /*  var user = authResult.user;
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType; */
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.

        return true;
      },
      signInFailure: function (error) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        addToast(error.message, { appearance: "error" });
        return error;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
      },
    },
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordValue.current.length < 6) {
      addToast("Mật khẩu cần dài hơn 6 ký tự", { appearance: "error" });
      return setError("Mật khẩu cần dài hơn 6 ký tự");
    }

    try {
      setError(null);
      setLoading(true);
      await signIn(emailValue.current, passwordValue.current);
    } catch (e) {
      setLoading(false);
      addToast(e.message, { appearance: "error" });
      return setError("Không thể đăng nhập");
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
              <Col
                md={6}
                className="p-5 overflow-auto"
                style={{ maxHeight: 560 }}
              >
                {loading && <Loader />}
                <CardTitle tag="h5" className="text-center mb-3">
                  ĐĂNG NHẬP
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
                  <small className="d-block mb-3 text-center">
                    <Link className="text-muted " to="/auth/resetPassword">
                      Quên mật khẩu ?
                    </Link>
                  </small>

                  <Button block color="primary">
                    Đăng nhập
                  </Button>

                  <StyledFirebaseAuth
                    className="custom-firebaseUi"
                    uiConfig={uiConfig}
                    firebaseAuth={auth}
                  />
                </Form>
                <p className="text-center text-muted mt-3">
                  Bạn chưa có tài khoản? <Link to="/auth/signUp"> Đăng ký</Link>
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
