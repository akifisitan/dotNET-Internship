import { Authenticate } from "./Auth.jsx";
import { Pages } from "./Pages.jsx";

export const App = () => {
  console.log("App re-rendered.");
  return (
    <Authenticate>
      <Pages />
    </Authenticate>
  );
};
