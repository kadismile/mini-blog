import React from 'react'
import {Redirect} from "react-router";
import LaddaButton, {EXPAND_LEFT, XXL} from "react-ladda";
import { auth } from "../../../actions/authActions";
import { connect } from "react-redux";


class Login extends React.Component {

  state= {
    email: '',
    password: '',
    loading: false,
    redirect: false,
  };

  submitPost = (e) => {
    e.preventDefault();
    const {email, password }  = this.state;
    this.props.onLogin(email, password);
    setTimeout(()=> {
      if (this.props.auth.isAuthenticated) {
        this.setState({ redirect: true })
      }
    }, 1000);
  };

  render() {
    const { loading , redirect} = this.state;
      return redirect ? <Redirect to='/'/> : (
       <div className="col-md-9 col-md-offset-3">
        <div className="posts">
          <div className="posts-inner">
            <article className="post">
              <div className="post-header">
                <h2 className="title"><span>Login</span></h2>
              </div>

              <div className="post-content">
                <div className="the-excerpt">

                  <form action="#" className="contact" style={{marginTop: '10px'}} encType="multipart/form-data">
                    <div className="contact-item">
                      <label>Email *</label>
                      <input name="email" onChange={(e)=> {this.setState({email: e.target.value}) }} type="email" />
                    </div>
                    <div className="contact-item">
                      <label>Password *</label>
                      <input name="password"  onChange={(e)=> {this.setState({password: e.target.value}) }} type="password" />
                    </div>
                    <LaddaButton
                      loading={loading}
                      onClick={this.submitPost}
                      data-size={XXL}
                      data-style={EXPAND_LEFT}
                      data-spinner-size={30}
                      data-spinner-color="#eee"
                      data-spinner-lines={20}
                    >
                      Login
                    </LaddaButton>
                  </form>
                </div>
              </div>
            </article>
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
    onLogin(email, password) {
      dispatch(auth.login(email, password));
    }
  };
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(Login);