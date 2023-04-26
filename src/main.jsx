import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventPageLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import {
  AddEvent,
  loader as addEventLoader,
  action as addevent,
} from "./pages/AddEvent";
import { EditEvent, loader as editEventLoader } from "./pages/EditEvent";
import ErrorBoundary from "./ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventPageLoader,
      },
      {
        path: "/event/addevent",
        element: <AddEvent />,
        loader: addEventLoader,
        action: <ErrorBoundary>addevent</ErrorBoundary>,
      },
      {
        path: "editevent/:eventId",
        element: <EditEvent />,
        loader: editEventLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
