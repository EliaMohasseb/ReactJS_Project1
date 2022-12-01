import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ArticleActions } from "../store/articles-slice";
import Spinner from "../UI/Spinner";
import { useState } from "react";
import classes from "./Articles.module.css";

const SearchLessArticles = () => {
  const [row, setrow] = useState(0);
  const [page, setpage] = useState(0);

  const access = useSelector((state) => state.login.accessToken);
  const title = useSelector((state) => state.article.Title);
  const author = useSelector((state) => state.article.author);
  const content = useSelector((state) => state.article.Content);
  const isFetching = useSelector((state) => state.article.isFetching);

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

      //   console.log(data.response.docs[row].headline.main);                                    /*title*/
      // console.log(data.response.docs[0].lead_paragraph);                                       /*body*/
      //   console.log(data.response.docs[0].byline.original);                                    /*author */
      // console.log(data.response.docs[0].snippet)                                                /*description */

      dispatch(ArticleActions.addTitle(data.response.docs[row].headline.main));
      dispatch(ArticleActions.addDescription(data.response.docs[row].snippet));
      dispatch(
        ArticleActions.addContent(data.response.docs[row].lead_paragraph)
      );
      dispatch(
        ArticleActions.addAuthor(data.response.docs[row].byline.original)
      );
    }
  }

  useEffect(() => {
    Searching(row, page);
  }, []);

 
  const renderArticles = () => {
    let a = [];
    for (let i = 0; i <= row; i++) {
      a.push(
        <h1 className={classes.h1}>{title[i]}</h1>,
        <h2 className={classes.h2}>{author[i]}</h2>,
        <h3 className={classes.h3}>{content[i]}</h3>
      );
    }
    return a;
  };

  const handleScroll = (event) => {
    console.log(event.currentTarget);
    
  };
  return (
    <div onScroll={handleScroll}>
        <br></br>
      {renderArticles()}
      {isFetching && <Spinner />}
    </div>
  );
};

export default SearchLessArticles;



/*I cant seem to Trigger OnScroll,but if i fix it, 
when we reach buttom of page icrenement row by 1
this will be a dependant of useeffect so it will trigger "SEARCHING"
this in turn adds 1 article to the list and it will show
only need to fix the OnScroll and add logic such that when row=9, page+1 row=0 (so that we get a new set of 10 articles from backedn)*/
