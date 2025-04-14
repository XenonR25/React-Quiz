import Answers from "./Answers";
import classes from "../styles/Question.module.css"
export default function Question(){
    return(
        <div className={classes.question}>
            <div className={classes.qtitle}>
                <span className="material-icons-outlined">help-outline</span>
                Here goes the question from the LWR
            </div>
            <Answers/>
        </div>
    );
}