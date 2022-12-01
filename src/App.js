import { Route, Switch, Redirect } from "react-router-dom";
import { Fragment } from "react";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import Header from "./Header/Header";
import Articles from "./pages/Articles";


function App() {
  return (
    <Fragment>
      <Header/>
      <main>      
        <Switch>
          <Route path='/' exact>              {/*Default path to login since only 2 screens requested */}
            <Redirect to='/login'/>
          </Route>                      
          <Route path ='/login'>
            <Login/>
          </Route>
          <Route path ='/articles'>
            <Articles/>
          </Route>
          <Route path='*'>                    {/*Alternative paths not available */}
            <NotFound />
          </Route>
        </Switch>
      </main>
      </Fragment>
  );
}

export default App;
