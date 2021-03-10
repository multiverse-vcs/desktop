import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import ViewAuthor from './pages/ViewAuthor'
import ViewRepo from './pages/ViewRepo'

function Routes() {
  const peerID = useSelector(state => state.user.peerID)

  return (
    <Switch>
      <Route path="/:peerID/:name">
        <ViewAuthor />
        <ViewRepo />
      </Route>
      <Route path="/:peerID">
        <ViewAuthor />
      </Route>
      <Route path="/">
        {peerID && <Redirect to={`/${peerID}`} />}
      </Route>
    </Switch>
  )
}

export default Routes