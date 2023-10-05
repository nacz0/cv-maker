import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Certificates } from "./components/Certificates";
import { Creator } from "./components/Creator";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Landing } from "./components/Landing";
import { Languages } from "./components/Languages";
import { Personal } from "./components/Personal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/creator",
    element: <Creator />,
    children: [
      {
        path: "/creator/personal",
        element: <Personal />,
      },
      {
        path: "/creator/education",
        element: <Education />,
      },
      {
        path: "/creator/experience",
        element: <Experience />,
      },
      {
        path: "/creator/certificates",
        element: <Certificates />,
      },
      {
        path: "/creator/languages",
        element: <Languages />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
