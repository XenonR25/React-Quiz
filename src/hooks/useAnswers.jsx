import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
export default function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]); //videos er jonne ekta state create kora holo

  useEffect(() => {
    //this callback function cannot be async because it is not a promise
    async function fetchAnswers() {
      //DATABASE relate work
      const db = getDatabase();
      const answerRef = ref(db, "answer" + "/" + videoID + "/questions");
      const answerQuery = query(answerRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        //request firebase to get the data
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            //here setVideos is a func which returns prevVideos and the Object.values(snapshot.val()) is the new value of videos
            return [...prevAnswers, ...Object.values(snapshot.val())]; //...Object.values means it will return the values of the object in an array format , Object.values(snapshot.val()) is the array of videos, so we have to destructure it to get the values of the object and then we will spread it in the prevVideos array.
          });
        } 
      } catch (err) {
        console.error("Error fetching questions:", err);
        setLoading(false);
        setError(true); //if error occurs then set the error state to true
      }
    }
    setTimeout(() => {
      fetchAnswers();
    }, 2000); //1 second er jonne loading state ta true thakbe
  }, [videoID]);

  return {
    loading,
    error,
    answers,
   
  };
}

