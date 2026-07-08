import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.css";
import { App } from "./routes/App";
import { ResumePage } from "./routes/ResumePage";
import { AppError } from "./components/AppError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
  },
  {
    path: "/repo/:owner/:repo",
    element: <Navigate replace to="/resume" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AppError}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
