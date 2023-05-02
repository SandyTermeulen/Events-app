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
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);

  return redirect(`/event/${newId}`);
};

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return { users: await users.json(), categories: await categories.json() };
};

export const AddEvent = () => {
  const { users, categories } = useLoaderData();
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setShowToast(true);
    localStorage.setItem("showToast", JSON.stringify(showToast));
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
        marginTop={"2rem"}
      >
        <Heading marginBottom={"3rem"} as="h1" size="2xl">
          Add new event
        </Heading>
        <Form method="post" id="new-event-form">
          <FormControl isRequired>
            <FormLabel>Select user</FormLabel>
            <Select name="createdBy" placeholder="Select User">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="An exciting title..."
              aria-label="Title"
              type="text"
              name="title"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              aria-label="description"
              placeholder="Description"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image (URL)</FormLabel>
            <Input
              placeholder="https://website.com/image.jpg"
              aria-label="image"
              type="text"
              name="image"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Select category</FormLabel>
            <Select name="categoryIds" placeholder="Select category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              aria-label="location"
              type="text"
              name="location"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Start time</FormLabel>
            <input
              aria-label="startTime"
              type="datetime-local"
              name="startTime"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>End time</FormLabel>
            <input aria-label="endTime" type="datetime-local" name="endTime" />
          </FormControl>
          <Button
            type="submit"
            margin={"1rem"}
            variant="outline"
            borderRadius="0"
            borderColor="black"
            boxShadow={useColorModeValue("6px 6px 0 black", "6px 6px 0 cyan")}
            onClick={handleClick}
          >
            Add event
          </Button>
        </Form>
      </Box>
    </Center>
  );
};
