import Qeustion from "./Question"
import classes from "../styles/Analysis.module.css"
export default function Analysis(){
    return(
        <div className={classes.analysis}>
            <h1>Question Analysis</h1>
            <h3>You answered 5 out of 10 questions correctly</h3>
            <Question/>
        </div>
    )
}