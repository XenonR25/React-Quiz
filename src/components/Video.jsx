// import image from "../assets/images/3.jpg"
import classes from "../styles/Video.module.css"
export default function Video({title,id,noq}) {
  return (
    <>
        <div className={classes.video}>
          <img src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`} alt={title} />
          <p>{title}</p>
          <div className="qmeta">
            <p>{noq} Questions</p>
            <p>Total Points : {noq*5}</p>
          </div>
        </div>
    </>
  );
}
// For MultiSelecting double click on that word and and press Ctrl+Shift+L