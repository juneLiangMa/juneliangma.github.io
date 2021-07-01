import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Post from './pages/Post'

export default () => {
  return (
    <div className="c">
      <Router>
        <h2>Photo Blog</h2>
        <hr />
        <div className="row">
          <div className="col">
            <Link to="/" className="ph2">Home</Link>
            <Link to="/collections" className="ph2">Collections</Link>
          </div>
          <div className="2 col">
          <Link to="/search" className="ph2">Search</Link>
          </div>
        </div>
        <Switch>
          <Route path="/read/:title" children={<Post />} />
        </Switch>
      </Router>
    </div>
  )
}
