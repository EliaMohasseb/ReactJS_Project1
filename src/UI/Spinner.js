import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.loading}>
        <div className={classes.spinner}></div>{" "}
      </div>
    
  );
};

export default Spinner;
