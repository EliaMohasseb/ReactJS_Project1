# ReactJS_CodeAssignment1
	

Allow me to start by thanking you for allowing me the opportunity to learn ReactJS and allowing me to start devaloping  a necessary skill for Front-End programming.
	

My project is made of 2 pages: /articles and /login with login being the defautlt (and checking for wrong URLS )<br>
/articles can not be accessed without a proper login sequence 
<br><br>
	

## Login:
Login.js / LoginFields.js has a lot of LOCs but is not difficult to understand.
- using a login-slice, i update username and password and set them valid if size>0 
- the implementation is done such that it is onchange of the input allowing us to add more criteria easily in the future
- the button for submissin is inactive if the validities are not true
- if user touches an input, we then check if the field is valid (!empty)
- we also use some logic to alter the error messages and css styling of the component
- when statesvalid, form can be entered, then POST FETCH function is requested and depending on response, we either get an error message or are sent to /articles
- a spinner is active whenever a fetch request is not complete
- inputs can not be changed when fetch request is active
	

## What i would change in Login:
- The error system is unnecesarily "complicated", should have taken the error response as is instead of reinventing one
- Add a time-out for fetch, Im not sure if it is my wifi, but i have to reload page several times due to not recieving a response
- Refactorize component, create a custom useHook for fetch as it will be seen 3 time
- custom component as well for both input fields as i doubled logic in many places
<br>
	

## Articles:
- ArticlesPage.js simply checks if the search bar is empty and displays a different component depending on the status
- Article-slice is also "deleted" (emptied) upon submission for re-filling of the filtered articles
- a spinner is also available whenever fetch is active


### Non-Filtered Articles:
- the flowchart is as follows: "->" = "triggers" <br>
upon running :  useEffect -> Search() -> Fetch article -> dispatch(title,author...)
upon scroll:  row++ -> useEffect[dependant:row] -> Search(row,pages) (pages for url, row for docs)-> dispatch (title[row2],author[row2]	

return renderArticles()
	

renderArtiecles <=> for 0<=i<=row, display article[i]
	

### What i Would Change in Non-Filtered:
- onScroll did not work making my useEffect run once and can only display 1 article
	

<br>
	

### Filtered
- The logic is similar, but we only dispatch if searcheditem is in title or description
- we also iterate and filter over 20 articles (page 0 1-10 and page 1 1-10
	

### What I Would Change in Filtered
- due to the logic i followed, i can only re-search when the input field is emptied before searching again
	

### what I would Change in both:
-  there are many redundant code, definitely use a custom hook for http and even for the dispatch


## What I would Change in general:
- css styling is non-standardized throughout the project, mostly due to picking assets online and not having time to fully customize
- I realize now i shied away from passing argument down and lifting states up. I think its mostly with focusing on making the redux work
	

# Final Comments:
Although the project is not fully functional, I am not too displeased <br>
Due to uni 5th year projects, I only had 3-4 nights (10pm-3am) to work on this and unfortunately can no longer allocate more time to it<br>
It is also my first independant react project where I showcased some advanced react knwoledge <br>
I will definitely come back one day and give it some proper time and headspace seeing as I enjoyed this small break from uni <br>
My code is filtered with comments, but i wanted to focus my ideas in one place
	

**Again, thank you for the opportunity! <br>
Elia Mohasseb**

