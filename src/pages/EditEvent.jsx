// @ts-nocheck
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

export const loader = async ({ params }) => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    users: await users.json(),
    categories: await categories.json(),
    event: await event.json(),
  };
};

export const EditEvent = () => {
  const toast = useToast();
  const { users, categories, event } = useLoaderData();
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    toast({
      title: "Event Edited Succesfully.",
      status: "success",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <Center>
      <Box
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
        padding={6}
        w={"80%"}
      >
        <Heading marginBottom={"3rem"} as="h1" size="2xl">
          Edit event
        </Heading>
        <Form method="PUT" id="new-event-form" onSubmit={handleEditSubmit}>
          <FormControl>
            <FormLabel>Select user</FormLabel>
            <Select
              name="createdBy"
              placeholder="Select User"
              value={updatedEvent.createdBy}
              onChange={handleInputChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="An exciting title..."
              aria-label="Title"
              type="text"
              name="title"
              value={updatedEvent.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              aria-label="description"
              placeholder="Description"
              value={updatedEvent.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image (URL)</FormLabel>
            <Input
              placeholder="https://website.com/image.jpg"
              aria-label="image"
              type="text"
              name="image"
              value={updatedEvent.image}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Select category</FormLabel>
            <Select
              name="categoryIds"
              placeholder="Select category"
              value={updatedEvent.categoryIds}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              aria-label="location"
              type="text"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Start time</FormLabel>
            <input
              aria-label="startTime"
              type="datetime-local"
              name="startTime"
              value={updatedEvent.startTime}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormLabel>
            <FormLabel>End time</FormLabel>
            <input
              aria-label="endTime"
              type="datetime-local"
              name="endTime"
              value={updatedEvent.endTime}
              onChange={handleInputChange}
            />
          </FormLabel>
          {console.log(updatedEvent)}
          <Button type="submit">Save</Button>
        </Form>
      </Box>
    </Center>
  );
};
