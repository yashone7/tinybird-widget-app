import { RouterProvider } from "react-router-dom";
import { SWRDevTools } from "swr-devtools";
import { router } from "./routes/routes";

function App() {
  return (
    <SWRDevTools>
      <RouterProvider router={router}></RouterProvider>
    </SWRDevTools>
  );
}

export default App;
