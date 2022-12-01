import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import "./LoginFields.css";
import { LoginActions } from "../store/login-slice";
import Spinner from "../UI/Spinner";

const LoginField = () => {
  const [userTouched, setuserTouched] = useState(false);
  const [passTouched, setpassTouched] = useState(false);

  const dispatch = useDispatch();

  const userValid = useSelector((state) => state.login.userValid);
  const passValid = useSelector((state) => state.login.passValid);
  const isFetching = useSelector((state) => state.login.isFetching);
  const UserName = useSelector((state) => state.login.username);
  const PassWord = useSelector((state) => state.login.password);
  const ErrorType = useSelector((state) => state.login.ErrorType);
  const isSET = useSelector((state) => state.login.isSET);

  const history = useHistory(); /*Used to change URL upon successful Login */

  async function SubmitHandler(event) {
    dispatch(
      LoginActions.setIsFethcing(true)
    ); /*When we submit, spinner activates until response is gotten */

    event.preventDefault(); /*Syntax taken from API. POST Method   */
    const response = await fetch("http://34.245.213.76:3000/auth/signin", {
      method: "POST",
      body: JSON.stringify({ username: UserName, password: PassWord }),
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();
    dispatch(LoginActions.setIsFethcing(false));
    console.log(data.statusCode); /*remove */
    console.log(data.accessToken);
    if (data.statusCode === 404) {
      dispatch(LoginActions.setErrorType("URL"));
    } else if (data.statusCode === 401) {
      dispatch(LoginActions.setErrorType("UN_AUTH"));
    } else if (data.accessToken !== undefined) {
      dispatch(LoginActions.setErrorType("NONE"));
      dispatch(LoginActions.setIsSET(true));
      dispatch(LoginActions.setAccessToken(data.accessToken))
    } else {
      dispatch(LoginActions.setErrorType("UNKNOWN"));
    }
  }

  const usernameChangeHandler = (event) => {
    /*I used this implementation since it is easy to adjust for more specifications later on (username>5 or must have @...*/

    if (event.target.value.trim() !== "") {
      dispatch(LoginActions.setUserValid(true));
    } else {
      dispatch(LoginActions.setUserValid(false));
    }
    dispatch(LoginActions.setUsername(event.target.value));
  };

  const passwordChangeHandler = (event) => {
    /*a template field could instead take events and return since there is redundant code scattered throughout this component */

    if (event.target.value.trim() !== "") {
      dispatch(LoginActions.setPassValid(true));
    } else {
      dispatch(LoginActions.setPassValid(false));
    }

    dispatch(LoginActions.setPassword(event.target.value));
  };

  const userTouchedHandler = () => {
    /*if the input is touched, we can assume user is active and display errors in input */
    setuserTouched(true);
  };
  const passTouchedHandler = () => {
    setpassTouched(true);
  };
  const userdesign =
    /*For Styling  */
    userValid || !userTouched ? "form-control" : "form-control  invalid";

  const passdesign =
    passValid || !passTouched ? "form-control" : "form-control  invalid";

  return (
    <form className="container" onSubmit={SubmitHandler}>
      <div className="white-box">
        <h1>Please login to view our articles!</h1>
        <div className={userdesign}>
          <label>Username</label>
          <input
            onChange={usernameChangeHandler}
            onBlur={userTouchedHandler}
            disabled={isFetching}
          />
        </div>
        <div className={passdesign}>
          <label>Password</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passTouchedHandler}
            type="password"
            disabled={isFetching} /*if fetching, dont change input*/
          />
        </div>
        {!userValid &&
          userTouched /*Tried implementing try/catch error and display it but due to time constraint couldnt fix some syntax issue.  */ && (
            <p className="error-text">- Username can not be empty</p>
          )}
        {!passValid && passTouched && (
          <p className="error-text">- Password can not be empty</p>
        )}
        {!isFetching && ErrorType === "UN_AUTH" && (
          <p className="error-text">- Username or Password is incorrect </p>
        )}
        {!isFetching && ErrorType === "URL" && (
          <p className="error-text">
            - Trouble establishing connection, please contact IT{" "}
          </p>
        )}
        {!isFetching && ErrorType === "UNKNOWN" && (
          <p className="error-text">- Unexpected issue, please contact IT</p>
        )}
        {!isFetching &&
          isSET === true &&
          ErrorType === "NONE" &&
          history.push("/articles")}

        <button disabled={!userValid || !passValid || isFetching}>
          Submit
        </button>
        {isFetching && <Spinner />}
      </div>
    </form>
  );
};

export default LoginField;

/*component needs refactoring... could be split into multiple components and custom hooks (hook for input template and hook for http request)  
Also set a timeout for fetching 
With some time this can be done  */
