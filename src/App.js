import React, { useContext, useEffect, useState } from "react";
import "./styles/App.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { About } from "./pages/About";
import Posts from "./pages/Posts";
import { NotFound } from "./pages/NotFound";
import { PostIdPage } from "./pages/PostIdPage";
import { Login } from "./pages/Login";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const publicRouter = createHashRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  const privateRouter = createHashRouter([
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

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true)
    } 
  }, [])
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuth }}>
      <RouterProvider router={isAuth ? privateRouter : publicRouter} />
    </AuthContext.Provider>
  );
}

export default App;
