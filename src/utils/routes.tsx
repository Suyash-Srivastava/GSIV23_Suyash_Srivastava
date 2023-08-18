import MovieList from "../pages/MovieList/MovieList";
import {
    Navigate,
    createBrowserRouter, redirect,
  } from "react-router-dom";
import MovieDetail from "../pages/MovieDetail/MovieDetail";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={'/movielist'}/>,
        errorElement:<h1>Oops Something went wrong, Check the route</h1>
    },
    {
        path: '/movielist',
        element: <MovieList/>,
    },
    {
        path:'/moviedetail/:movieId',
        element:<MovieDetail/>,
        errorElement:<h1>Oops Something went wrong, Check the route</h1>
    }
]);