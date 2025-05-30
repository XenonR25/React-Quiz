import Answers from "./Answers";
import classes from "../styles/Question.module.css"
export default function Questions({answers = []}){
    return answers.map((answer, index) => (
        <div className={classes.question} key={index}>
            <div className={classes.qtitle}>
                <span className="material-icons-outlined">help-outline</span>
               {answer.title}
            </div>
            <Answers/>
        </div>
        ))
};