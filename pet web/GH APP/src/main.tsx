import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import "./styles.css";
import { App } from "./routes/App";
import { RepoDetails } from "./routes/RepoDetails";
import { ResumePage } from "./routes/ResumePage";
import { AppError } from "./components/AppError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/repo/:owner/:repo",
    element: <RepoDetails />,
  },
  {
    path: "/resume",
    element: <ResumePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={AppError}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
);
