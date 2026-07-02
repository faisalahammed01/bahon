import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";

import Coverage from "../pages/Coverage/Coverage";
import Home from "../pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,  
    children: [

      {
        index: true,
        Component: Home,  
      },
      {
        path: '/coverage',
        Component: Coverage,
         loader: () => fetch('/serviceSenter.json').then(res => res.json())
      }
    ]
  },
]);
