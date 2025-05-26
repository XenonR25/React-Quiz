import { useHistory, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analaysis";
import Summary from "../Summary";
import _ from "lodash";
export default function Result() {
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  const { id } = useParams();

  const { loading, error, answers } = useAnswers(id);

  function calculate(){
    let score = 0;
    answers.forEach((question, index1)=>{
        let correctIndexes = [],
        checkedIndexes = [];


        question.options.forEach((option,index2)=>{
            if(option.correct) correctIndexes.push(index2);
            if(qna[index1].options[index2].checked){ checkedIndexes.push(index2);
                option.checked = true;
            }
        });
        if(_.isEqual(correctIndexes, checkedIndexes)){
            score = score + 5;
        }
    })
    return score;
  }

  const userScore = calculate();
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error fetching answers</h1>}
      {answers && answers.length > 0 (
        <>
          <Summary score={userScore} noq={answers.length}/>
          <Analysis answers={answers}/>
        </>
      )}
    </>
  );
}
