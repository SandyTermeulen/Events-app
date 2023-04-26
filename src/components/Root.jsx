import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import React from "react";

export const Root = () => {
  //backgroundImage="url('https://images.unsplash.com/photo-1579492450119-80542d516179?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
  return (
    <Box
      backgroundImage="url('https://images.unsplash.com/photo-1579492450119-80542d516179?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
      minHeight={"100vh"}
    >
      <Navigation />
      <Outlet />
    </Box>
  );
};
