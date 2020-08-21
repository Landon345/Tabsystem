import React, { useState } from "react";
//form imports
import { Formik } from "formik";
import * as Yup from "yup";
//component imports
import Navbar from "../Navbar";
import Auth from "../../Auth";
//style imports
import { Box, Icon } from "@chakra-ui/core";
import { Label, Form, FormInput, Button } from "./Styles";

const validationScema = Yup.object().shape({
  name: Yup.string().required("Must enter an name"),
  password: Yup.string()
    .min(4, "All passwords are at least 4 characters long")
    .required("Must have a password"),
});

export default function Login(props) {
  const [message, setMessage] = useState(Auth.getMessage());

  return (
    <Box>
      <Navbar />
      <Box px="10%" height="90vh" bg="third100" py="20px">
        <h1>Login to tabsystem</h1>
        <Box color="White" mt="15px">
          {message}...
        </Box>
        <Formik
          initialValues={{ name: "", password: "" }}
          validationSchema={validationScema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const user = {
              name: values.name,
              password: values.password,
            };

            Auth.login((admin) => {
              if (admin) {
                props.history.push("/dashboard");
              } else {
                props.history.push("/mydashboard");
              }
            }, user);
            console.log(Auth.getMessage());
            setMessage(Auth.getMessage());
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Form className="form-group">
                <Label htmlFor="name">name</Label>
                <FormInput
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <Error touched={touched.name} message={errors.name} />
              </Form>
              <Form>
                <Label htmlFor="password">Password</Label>
                <FormInput
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <Error touched={touched.password} message={errors.password} />
              </Form>
              <Form>
                <Box></Box>
                <Button bg="first100" type="submit" disabled={isSubmitting}>
                  Login
                </Button>
                <Box></Box>
              </Form>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

function Error({ touched, message }) {
  if (!touched) {
    return <div style={{ color: "red" }}>&nbsp;</div>;
  }
  if (message) {
    return <div style={{ color: "orange", textAlign: "right" }}>{message}</div>;
  }
  return (
    <div style={{ color: "white", textAlign: "right" }}>
      <Icon name="check" />
    </div>
  );
}
