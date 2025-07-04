// import classes from "../../styles/Quiz.module.css"
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom"; 
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import ProgressBar from "../ProgressBar";
import MiniPlayer from "../MiniPlayer";

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      // eslint-disable-next-line no-case-declarations
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};
export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const { state } = location;
  // const { videoTitle = "Default title" } = state;

  //useEffect to set questions when they are fetched


  useEffect(() => {
    if(questions?.length){
    dispatch({
      type: "questions",
      value: questions,
    });}
  }, [questions]);

 

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  //handle when user clicks next question
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }

  //handle when user clicks previous question
  function previousQuestion() {
    if (currentQuestion > 0 && currentQuestion < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }
  //calculate progress percentage
  const progressPercentage =
    questions.length > 0
      ? Math.round(((currentQuestion + 1) / questions.length) * 100)
      : 0;

  //submit the quiz
  async function submitQuestion() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna,
    });


    navigate({
      pathname: `/result/${id}`,
      state: {
        qna: qna,
      },
    });
  }
  return (
    <>
      {loading && <h4>Loading...</h4>}
      {error && <h4>Error: {error}</h4>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
            input={true}
          />
          <ProgressBar
            next={nextQuestion}
            previous={previousQuestion}
            progress={progressPercentage}
            submit={submitQuestion}
          />

          <MiniPlayer title={currentQuestion.title} id={id} />
        </>
      )}
    </>
  );
}
