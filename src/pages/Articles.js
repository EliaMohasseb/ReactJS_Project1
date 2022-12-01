import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";
import { LoginActions } from "../store/login-slice";
import ArticlesPage from "../components/ArticlesPage";

const Articles = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSET = useSelector((state) => state.login.isSET);

  const LogoutHandler = () => {
    dispatch(LoginActions.setIsSET(false));
    history.push("/login");
  };

  return (
    <Fragment>
      {!isSET ? (       /*If we enter"/articles" from url directly, check if we are logged in  */
        <div>
          <br></br>
          <button onClick={LogoutHandler}>Please Login To Continue</button>
        </div>
      ) : (
        <div>
          <button
            onClick={LogoutHandler}
            style={{
              position: "absolute",
              right: 1,
            }}
          >
            Log out
          </button>
          <ArticlesPage />
        </div>
      )}
    </Fragment>
  );
};
export default Articles;
