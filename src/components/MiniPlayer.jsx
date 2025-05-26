import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
  const buttonRef = useRef(null);
  const [status, setStatus] = useState(false);
  const videoURL = `https://www.youtube.com/watch?v=${id}`;
  function toggleMiniPlayer() {
    if (!status) {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    } else {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    }
  }
  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
      onClick={toggleMiniPlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        {" "}
        play_circle_filled{" "}
      </span>
      <span
        className={`material-icons-outlined ${close}`}
        onClick={toggleMiniPlayer}
      >
        {" "}
        close{" "}
      </span>
      <ReactPlayer
        className={classes.player}
        url={videoURL}
        width="300px"
        height="168px"
        playing={status}
      />
      <p>{title}</p>
    </div>
  );
}
