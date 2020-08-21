import React, { useState, useEffect } from "react";
//form imports
import { Formik } from "formik";
import * as Yup from "yup";
//component imports
import Navbar from "../../Components/Navbar";
import Auth from "../../Auth";
//style imports
import { Box, Icon } from "@chakra-ui/core";
import { Label, Form, FormInput, Button } from "./Styles";

const validationScema = Yup.object().shape({
  name: Yup.string().required("Must enter an name"),
  password: Yup.string()
    .min(4, "All passwords are at least 4 characters long")
    .required("Must have a password"),
  site_number: Yup.string().max(4, "Max length of 4"),
});

export default function Register(props) {
  const [message, setMessage] = useState(Auth.getRegisterMessage());

  //useEffect(() => {}, [message]);

  return (
    <Box>
      <Navbar />
      <Box px="10%" height="90vh" bg="third100" py="20px" color="White">
        <h1>Register user into the tabsystem</h1>
        <Box color="White" mt="15px">
          {message}...
        </Box>
        <Formik
          initialValues={{ name: "", password: "", site_number: "" }}
          validationSchema={validationScema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const user = {
              site_number: values.site_number,
              name: values.name,
              password: values.password,
            };

            Auth.register((message) => {
              setMessage(message);
            }, user);
            console.log(Auth.getRegisterMessage());
            setMessage(Auth.getRegisterMessage());
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
              <Form>
                <Label htmlFor="site_number">site number</Label>
                <FormInput
                  type="text"
                  name="site_number"
                  id="site_number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.site_number}
                />
                <Error
                  touched={touched.site_number}
                  message={errors.site_number}
                />
              </Form>
              <Form>
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
                  Register
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
