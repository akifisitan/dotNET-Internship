import { AuthCheck } from "./auth/AuthCheck";
import { Pages } from "./pages/Pages";

export const App = () => {
  console.log("App re-rendered.");
  return (
    <AuthCheck>
      <Pages />
    </AuthCheck>
  );
};
