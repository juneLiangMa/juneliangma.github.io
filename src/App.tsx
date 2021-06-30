import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Post from './pages/Post'

export default () => {
  return (
    <Router>
      <Switch>
        <Route path="/:title" children={<Post />} />
      </Switch>
    </Router>
  )
}
