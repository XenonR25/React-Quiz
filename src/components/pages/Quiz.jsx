// import classes from "../../styles/Quiz.module.css"
import Answers from "../Answers"
import ProgresBar from "../ProgressBar"
import MiniPlayer from "../MiniPlayer "
export default function Quiz() {
  return (
    <>
      <h1>Pick three of your favorite Star Wars Flims</h1>
      <h4>Question can have multiple answers</h4>
      <Answers/>
      <ProgressBar/>
      <MiniPlayer/>
    </>
  );
}
