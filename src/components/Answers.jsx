import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";
export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) =>
        input ? (
          <Checkbox
            key={index}
            className={classes.answer}
            text={option.title}
            value={index}
            checked={option.checked}
            onChange={(e) => handleChange(e, index)}
          />
        ) : (
          <Checkbox
            key={index}
            className={`${classes.answer} ${
              option.correct
                ? classes.correct
                : option.checked
                ? classes.wrong
                : null
            } `} //first e correct kina dekhte hobe,then checked kina dekhte hobe, jodi correct hoi tahole correct dibe r jodi checked hoi and incorrect hoi tahole wrong dibe
            text={option.title}
            defaultChecked={option.checked}
            disabled
          />
        )
      )}
    </div>
  );
}
