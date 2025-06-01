import classes from "../styles/Illustration.module.css";
import image from "../assets/images/signup.jpg"; // Importing the illustration image

export default function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={image} alt="Signup" />
    </div>
  );
}
