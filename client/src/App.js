import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./components/SideBar";
import BlogPost from "./components/BlogPost";
import CreateBlog from "./components/CreateBlog";

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
