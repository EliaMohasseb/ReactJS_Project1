import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ArticleActions } from "../store/articles-slice";
import Spinner from "../UI/Spinner";
import { useState } from "react";
import classes from "./Articles.module.css";

const SearchedArticles = () => {
  /*Do not load more on scroll... I will limit the search  to  2 pages for the sake of this project */
    let total = 0

  const access = useSelector((state) => state.login.accessToken);
  const title = useSelector((state) => state.article.Title);
  const author = useSelector((state) => state.article.author);
  const content = useSelector((state) => state.article.Content);
  const isFetching = useSelector((state) => state.article.isFetching);
  const search = useSelector((state) => state.article.SearchTerm);

  const dispatch = useDispatch();

  async function Searching(row, page) {
    dispatch(ArticleActions.setIsFetching(true));
    const response = await fetch(
      `http://34.245.213.76:3000/articles?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access,
          accept: "application-json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    } else {
      const data =
        await response.json(); /*We should check for errors, ...time constarint */
      dispatch(ArticleActions.setIsFetching(false));
      console.log(data.response.docs[row].headline.main.includes(search) || data.response.docs[row].snippet.includes(search))

      if(data.response.docs[row].headline.main.includes(search) || data.response.docs[row].snippet.includes(search)){
        dispatch(ArticleActions.addTitle(data.response.docs[row].headline.main));
        dispatch(ArticleActions.addDescription(data.response.docs[row].snippet));
        dispatch(
          ArticleActions.addContent(data.response.docs[row].lead_paragraph)
        );
        dispatch(
          ArticleActions.addAuthor(data.response.docs[row].byline.original)
        );
        total++
      }
    }
  }

  useEffect(() => {
    for(let i = 0; i<2;i++){
        for(let j = 0; j<10; j++){
    Searching(j, i);
    }}
  }, []);

  const renderArticles = () => {
    let a = [];
    for (let i = 0; i <= total; i++) {
      a.push(
        <h1 className={classes.h1}>{title[i]}</h1>,
        <h2 className={classes.h2}>{author[i]}</h2>,
        <h3 className={classes.h3}>{content[i]}</h3>
      );
    }
    return a;
  };

  return (
    <div>
      {renderArticles()}
      {isFetching && <Spinner />}
    </div>
  );
};
export default SearchedArticles;

/*Fix logic where you have to remove entire input to put a new one maybe add isEntered to slice and put it dependency*/