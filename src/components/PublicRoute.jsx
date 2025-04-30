import { Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// eslint-disable-next-line no-unused-vars
export default function PublicRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return !currentUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route> //render props applied in here
  ) : (
    <Redirect to="/" />
  );
}
