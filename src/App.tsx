import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Post from "./pages/Post";
import Feed from "./pages/Feed";
import Collections from "./pages/Collections";
import ScrollToTop from "./component/ScrollToTop";
import NoMatch from "./pages/NoMatch";

export default () => {
  return (
    <div className="c">
      <Router>
        <ScrollToTop />
        <h2>Photo Blog</h2>
        <hr />
        <div className="row mb3">
          <div className="col">
            <Link to="/" className="ph2">
              Feed
            </Link>
            <Link to="/collections" className="ph2">
              Collections
            </Link>
          </div>
        </div>
        <Switch>
          <Route path="/read/:title" children={<Post />} />
          <Route path="/feed/:page" children={<Feed />} />
          <Route path="/collections" children={<Collections />} />
          <Route exact path="/" children={<Feed />} />
          <Route path="*" children={<NoMatch />} />
        </Switch>
      </Router>
    </div>
  );
};
