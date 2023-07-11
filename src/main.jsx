import React from 'react'
import ReactDOM from 'react-dom/client'
import MyApp from './App.jsx'
import { action as destroyAction } from "./routes/destroy";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Contact,{ loader as contactLoader} from "./routes/contact";
import './index.css'
 //import Root ,{loader as rootLoader}from "./routes/root"
 import Root, { 
  loader as rootLoader,
  action as rootAction,
 } from "./routes/root";
 import ErrorPage from './error-page/';
 import EditContact,{  action as editAction,} from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<ErrorPage />,
    loader: rootLoader, 
    action: rootAction,
  children: [
    {
      path: "contacts/:contactId",
      element: <Contact />,
      loader: contactLoader,
    },
    {
      path: "contacts/:contactId/edit",
      element: <EditContact />,
      loader: contactLoader,
      action:editAction,
    },
    {
      path: "contacts/:contactId/destroy",
      action: destroyAction,
      errorElement:<div>There was an error</div>
    },
    {
     path:"contacts/:contactId/todo",
     element: <MyApp />
    },
    ],},
   
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
  
)


