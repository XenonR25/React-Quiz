import Checkbox from "../Checkbox";
import SignupForm from "../SignupForm";

export default function Signup() {
  return (
    <>
      <h1>Create an Account</h1>
      <div className="column">
        <Illustration />
        <SignupForm/>
      </div>
    </>
  );
}
