import { AuthCheck } from "./auth/AuthCheck.jsx";
import { Pages } from "./Pages.jsx";

export const App = () => {
  console.log("App re-rendered.");
  return (
    <AuthCheck>
      <Pages />
    </AuthCheck>
  );
};
