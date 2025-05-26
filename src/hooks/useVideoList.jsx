import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";
export default function useVideoList(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]); //videos er jonne ekta state create kora holo
  const [hasMore, setHasMore] = useState(true); //hasMore er jonne ekta state create kora holo

  useEffect(() => {
    //this callback function cannot be async because it is not a promise
    async function fetchVideos() {
      //DATABASE relate work
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(
        videosRef,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );
      try {
        setError(false);
        setLoading(true);
        //request firebase to get the data
        const snapshot = await get(videoQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setVideos((prevVideos) => {
            //here setVideos is a func which returns prevVideos and the Object.values(snapshot.val()) is the new value of videos
            return [...prevVideos, ...Object.values(snapshot.val())]; //...Object.values means it will return the values of the object in an array format , Object.values(snapshot.val()) is the array of videos, so we have to destructure it to get the values of the object and then we will spread it in the prevVideos array.
          });
        } else {
          //
          setHasMore(false); //if there is no data then set the hasMore state to false
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setLoading(false);
        setError(true); //if error occurs then set the error state to true
      }
    }
    setTimeout(() => {
      fetchVideos();
    }, 2000); //1 second er jonne loading state ta true thakbe
  }, [page]);


  return {
    loading,
    error,
    videos,
    hasMore,
  };
}

//FOR INFINITY SCROLLING THERE IS A PACKAGE CALLED REACT INFINITY SCROLLING
