// @ts-nocheck
import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  Text,
  Center,
  Box,
  useColorModeValue,
  Img,
  HStack,
  Input,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch("http://localhost:3000/categories");
  //const users = await fetch(`http://localhost:3000/users`);

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      event.description.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <Center py={6}>
      <Box>
        <Center>
          <Box
            boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
            border={"1px"}
            padding={"1rem"}
            w={"80%"}
            justifyContent={"center"}
            marginBottom={"2rem"}
            bg="white"
          >
            <Heading marginBottom={"2rem"} as="h1" size="3xl">
              Upcoming events
            </Heading>
            <Input
              placeholder="Search events"
              margin={3}
              onChange={handleSearchInput}
              color="#5271ff"
              borderColor="#21130d"
              boxSize={"90%"}
              height="40px"
            />
          </Box>
        </Center>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} justifyItems="center">
          {filteredEvents.map((event) => (
            <Box
              key={event.id}
              w="xs"
              h={"md"}
              my={5}
              mx={[0, 5]}
              overflow={"hidden"}
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
                  h="12.5rem"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>
              <Box p={4}>
                <Box>
                  {/*
                  {categories.map((category) =>
                    event.categoryIds.includes(category.id) ? (
                      <Text
                        fontSize={"xs"}
                        fontWeight="medium"
                        key={category.id}
                      >
                        {category.name}
                      </Text>
                    ) : null
                  )} 
                  */}

                  {categories.map((category) =>
                    event.categoryIds?.includes(category.id) ? (
                      <Tag
                        key={category.id}
                        fontWeight="medium"
                        fontSize={"sm"}
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

                {console.log(categories)}

                <Link to={`event/${event.id}`}>
                  <Heading
                    marginBottom={"0.3rem"}
                    as="h1"
                    size="lg"
                    noOfLines={1}
                  >
                    {event.title}
                  </Heading>
                </Link>
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
                <Text
                  fontSize="2xl"
                  noOfLines={1}
                >{`${event.description}`}</Text>
              </Box>

              <HStack p={4} borderTop={"1px"} color="black">
                <Link to={`event/${event.id}`}>
                  <Text fontSize={"md"} fontWeight={"semibold"}>
                    Check event
                  </Text>
                </Link>
                <ArrowForwardIcon />
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};
