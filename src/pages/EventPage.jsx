// @ts-nocheck
import {
  Box,
  Center,
  Heading,
  Img,
  Text,
  useColorModeValue,
  HStack,
  Tag,
} from "@chakra-ui/react";
import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();

  return (
    <Center>
      <Box>
        <Box
          key={event.id}
          bg="white"
          border={"1px"}
          borderColor="black"
          boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        >
          <Box>
            <Img
              src={event.image}
              roundedTop={"sm"}
              objectFit="cover"
              h="full"
              w="full"
              alt={"Blog Image"}
            />
          </Box>

          <Box p={6}>
            <Box>
              {categories.map((category) =>
                event.categoryIds.includes(category.id) ? (
                  <Tag
                    fontSize={"sm"}
                    fontWeight="medium"
                    key={category.id}
                    color="white"
                    bg="black"
                    borderRadius="0"
                    p={2}
                    marginRight={3}
                    marginBottom={3}
                  >
                    {category.name}
                  </Tag>
                ) : null
              )}
            </Box>

            <Heading marginBottom={"0.3rem"} as="h1" size="2xl" noOfLines={1}>
              {event.title}
            </Heading>

            <Text marginBottom={"1rem"}>
              {new Date(event.startTime).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              {"-"}
              {new Date(event.endTime).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text fontSize="4xl" noOfLines={2}>{`${event.description}`}</Text>
            <Text>location: {event.location}</Text>
          </Box>
          <HStack p={4} borderTop={"1px"} color="black">
            <Link to={"/"}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                Back to all events
              </Text>
            </Link>
            <ArrowForwardIcon />
          </HStack>
        </Box>
      </Box>
    </Center>
  );
};
