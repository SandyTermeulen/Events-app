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
    <Box boxShadow={useColorModeValue("3px 3px 0 black", "6px 6px 0 cyan")}>
      <Flex minWidth="max-content" alignItems="center" gap="2" margin={"1rem"}>
        <Box p="2">
          <Heading size="md">Events App</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <Link to={"/"}>
            <Button colorScheme="gray" marginBottom={"0.5rem"}>
              All events
            </Button>
          </Link>
          {/* 
        <Link to={"/event/new"}>
            <Button colorScheme="gray">Add event +</Button>
          </Link>
        */}
          <Link to={"/event/addevent"}>
            <Button colorScheme="gray">Add event 2.0</Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
