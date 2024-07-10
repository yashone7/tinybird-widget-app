import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/components/Dashboard/Dashboard";
import type { RouteObject } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={<Dashboard />}
          errorElement={<h1>Not Found</h1>}
        ></Route>
      </>
    ) as RouteObject[]
  );
