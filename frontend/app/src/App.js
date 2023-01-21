import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomeScreen from "./HomeScreen";
import BlogPostScreen from "./BlogPostScreen";
import PublishBlogScreen from "./PublishBlogScreen";
import Header from './Header'

const App = () => {
  return (
    <>
    <Router>
    <Header/>
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route path="/blogs/:blogId" component={BlogPostScreen} />
      <Route path="/publish" component={PublishBlogScreen} />
      <Redirect to="/" />
      </Switch>

    </Router>
  </>
  );
};

export default App;
