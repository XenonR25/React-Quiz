import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";


export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState();


  const { signup } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e){
    e.preventDefault(); //doesnt reload on first default page loading 
    //do validation
    if(password !== confirmPassword){
      return setError("Passwords don't match");
    }

    try{
      setError("");
      setLoading(true);
      await signup(email,password, username);
      navigate("/")
    } catch(err){
        console.log(err);
        setLoading(false);
        setError("failed to sigup");
    }
  }
  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter Name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        required
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
      />

       <Button disabled={loading} type="submit"> {/* when we want to disable submit button from loading again and again */}
        <span>Submit Now</span>
      </Button>
      {error && <p className='error'>{error}</p>}

      <div className="info">
        Already have an account? <a href="login.html">Login</a> instead.
      </div>
    </Form>
  );
}
