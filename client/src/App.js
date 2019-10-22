import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect } from "react-router-dom";
import { auth } from "./actions/authActions";

import Sidebar from "./components/SideBar";
import BlogPost from "./components/Blog/BlogPosts";
import CreateBlog from "./components/Blog/CreateBlog";
import EditBlog from "./components/Blog/BlogEdit";
import ViewBlog from "./components/Blog/ViewBlog";
import Debug from "./components/debug/";
import Login from "./components/Authenticate/Login";

  const App = () => {
    return (
      <Router>
        <>
          <Sidebar/>
            <Switch>
              <Route path="/" exact render={props => <BlogPost {...props} />}/>
              <Route path="/blog/:blog_id" exact render={props => <ViewBlog {...props} />}/>
              <Route path="/login" exact render={props => <Login {...props} />}/>
              <Route path="/debug" exact render={props => <Debug {...props} />}/>

              <Route path="/new/blog" exact render={ props => auth.isAuthenticated() ? <CreateBlog {...props} /> : <Redirect to="/login" />}/>
              <Route path="/blog/edit/:blog_id" exact render={ props => auth.isAuthenticated() ? <EditBlog {...props} /> : <Redirect to="/login" />}/>

            </Switch>
        </>
      </Router>
    );
  };


export default App;
