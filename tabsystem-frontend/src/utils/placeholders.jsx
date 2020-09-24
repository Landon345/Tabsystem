import { Box, Spinner } from "@chakra-ui/core";
import React from "react";

export const FailedState = ({
  message = "We are having trouble fetching our data, try again later.",
  ...props
}) => (
  <Box {...props}>
    <Box textAlign="center" color="white" fontSize="30px">
      {message}
    </Box>
  </Box>
);
export const LoadingState = (props) => (
  <Box textAlign="center" fontSize="50px" mt="60px">
    Loading... <Spinner />
  </Box>
);
