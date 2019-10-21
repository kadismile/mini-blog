import React from 'react'
import Logo from '../../assets/images/logo.png'
import { auth } from "../../actions/authActions";
import { connect } from "react-redux";

class Sidebar extends React.Component {

  logOut =() => {
    this.props.onLogOut()
  };
  displayLogOut =()=> {
    let auth = this.props.auth;
    return auth.isAuthenticated ? <a href="#" onClick={this.logOut}>Log Out</a> : ''
  };

  render() {
    return (
      <div className="col-md-3">
        <div className="header affix">
          <div className="table">
            <div className="table-cell">
              <div className="logo">
                <a href="/">
                  <img src={Logo} alt="Logo" />
                </a>
              </div>
              <div className="main-menu">
                <nav>
                  <ul className="menu-list">
                    <li className="menu-item-has-children">
                      <a href="/">Home</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="index.html">Standard Layout</a>
                        </li>
                        <li>
                          <a href="index-grid.html">Grid Layout</a>
                        </li>
                        <li>
                          <a href="index-grid-1st-large.html">Grid 1st Large</a>
                        </li>
                        <li>
                          <a href="index-list.html">List Layout</a>
                        </li>
                        <li>
                          <a href="index-list-1st-large.html">List 1st Large</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="#">Lifestyle</a>
                    </li>
                    <li>
                      <a href="#">Travel</a>
                    </li>
                    <li className="menu-item-has-children">
                      <a href="single.html">Single</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="single.html">Image</a>
                        </li>
                        <li>
                          <a href="single.html">Gallery</a>
                        </li>
                        <li>
                          <a href="single.html">Slideshow</a>
                        </li>
                        <li>
                          <a href="single.html">Youtube Video</a>
                        </li>
                        <li>
                          <a href="single.html">Vimeo Video</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="/new/blog">Add New Post</a>
                    </li>
                    <li>
                      {this.displayLogOut()}
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="socials">
                <a href="#" title="Behance">
                  <i className="fa fa-behance" />
                </a>
                <a href="#" title="Dribbble">
                  <i className="fa fa-dribbble" />
                </a>
                <a href="#" title="Facebook">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#" title="Google Plus">
                  <i className="fa fa-google-plus" />
                </a>
                <a href="#" title="Instagram">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#" title="Search this site">
                  <i className="fa fa-search" />
                </a>
              </div>
              <div className="box-search">
                <form role="search" method="get" action="#">
                  <input type="text" placeholder="Search ..." name="s" />
                </form>
              </div>
              <div className="copyright">
                <p>
                  Tancho @ {new Date().getFullYear()}. Design by <a href="#">kadismile</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
  return {
    onLogOut() {
      dispatch(auth.logoOut());
    }
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Sidebar);