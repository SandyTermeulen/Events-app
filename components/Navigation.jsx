// @ts-nocheck
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box bg="white" borderBottom="2px" borderColor="black">
      <Flex minWidth="max-content" alignItems="center" gap="2" margin={"1rem"}>
        <Box p="5">
          <Heading size="md">Events App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Link to={"/"}>
            <Button
              marginBottom={"0.5rem"}
              variant="outline"
              borderRadius="0"
              borderColor="black"
              boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
            >
              All events
            </Button>
          </Link>
          <Link to={"/event/addevent"}>
            <Button
              marginBottom={"0.5rem"}
              variant="outline"
              borderRadius="0"
              borderColor="black"
              boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
            >
              Add event
            </Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
