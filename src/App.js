import React from "react";
import "./styles/App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { About } from "./pages/About";
import Posts from "./pages/Posts";
import { NotFound } from "./pages/NotFound";
import { PostIdPage } from "./pages/PostIdPage";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Posts />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/:id",
      element: <PostIdPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
