import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./components/SideBar";
import BlogPost from "./components/Blog/BlogPosts";
import CreateBlog from "./components/Blog/CreateBlog";
import EditBlog from "./components/Blog/BlogEdit";

class App extends React.Component {
  componentDidMount() {}

  appRoute = () => {
    return (
      <BrowserRouter>
        <>
          <Sidebar/>
            <Switch>
              <Route path="/" exact render={props => <BlogPost {...props} />}/>
              <Route path="/blog/create" exact render={props => <CreateBlog {...props} />}/>
              <Route path="/blog/edit/:blog_id" exact render={props => <EditBlog {...props} />}/>
            </Switch>
        </>
      </BrowserRouter>
    );
  };

  render() {
      return this.appRoute();
  }
}


export default App;
