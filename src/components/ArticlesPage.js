import { Fragment } from "react";
import classes from "./ArticlesPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ArticleActions } from "../store/articles-slice";
import SearchLessArticles from "./SearchLessArticles";
import SearchedArticles from "./SearchedArticles";

const ArticlesPage = () => {
  const dispatch = useDispatch();

  const isEmpty = useSelector((state) => state.article.isEmpty);
  const search = useSelector((state) => state.article.SearchTerm);

  const ChangeHandler = (event) => {
    dispatch(ArticleActions.setSearch(event.target.value));
  };

  const SearchHandler = (event) => {
    event.preventDefault();
    if (search !== "") {
      dispatch(ArticleActions.setIsEmpty(false));
    } else {
      dispatch(ArticleActions.setIsEmpty(true));
    }
    dispatch(ArticleActions.deleteAll)
  };

  return (
    <Fragment>
      <br></br>
      <form className={classes["search"]} onSubmit={SearchHandler}>
        <input
          onChange={ChangeHandler}
          className={classes["searchTerm"]}
          placeholder="Search For Articles"
        />
      </form>
      <br></br>
      {isEmpty && <SearchLessArticles/>}
      {!isEmpty && <SearchedArticles/>}
    </Fragment>
  );
};
export default ArticlesPage;
