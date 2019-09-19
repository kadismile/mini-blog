import React, { Component, Fragment } from "react";
import request from "superagent";
import debounce from "lodash.debounce";
import {Link} from "react-router-dom";
import moment from "moment";

class Debug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      blogs: [],
      skip: -1
    };

    window.onscroll = debounce(() => {
      const {loadData,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;
      if (error || isLoading || !hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadData();
      }
    }, 100);
  }
  serverUrl = process.env.REACT_APP_SERVER_URL;
  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    let skip = this.state.skip;
    this.setState({ isLoading: true, skip: skip+=1 }, () => {
      console.log("Skip", skip);
      request
        .get(`${this.serverUrl}/blogs/get/${skip}`)
        .then((results) => {
          const nextData = results.body.map(blog => ({
            title: blog.title,
            author: blog.author,
            category: blog.category,
            description: blog.description,
            imageUrl: blog.imageUrl,
          }));
          this.setState({
            hasMore: (this.state.blogs.length < 100),
            isLoading: false,
            blogs: [...this.state.blogs, ...nextData,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
          });
        })
    });
  };

  render() {
    const {
      error,
      hasMore,
      isLoading,
      blogs,
    } = this.state;

    return (
      /*loading ? <img src={`${this.siteUrl}/images/load-icon.gif`} alt="" className="center"/> :*/
        <div className="col-md-9 col-md-offset-3">
          <div className="posts">
            <div className="posts-inner">
              {blogs.map((blog, key)=>{
                return ( <article className="post" key={key}>
                  <div className="post-header">
                    <h2 className="title">
                      <Link to={`/blog/${blog._id}`}>
                        {blog.title}
                      </Link>
                    </h2>
                    <div className="post-details">
                      <div className="post-cat">
                        <a href="#">{blog.category}</a>
                      </div>
                      <a href="#" className="post-date"><span>{moment(blog.createdAt).format('MMM DD, Y')}</span></a>
                      <div className="post-details-child">
                        <Link to={`/blog/edit/${blog._id}`} className="post-views">Edit</Link>
                        <a href="#" className="post-views">15 views</a>
                        <a href="#" className="post-comments">03 Comments</a>
                        <div className="post-share-icon">
                          <span>SHARE</span>
                          <ul>
                            <li><a href="#"><i className="fa fa-facebook" /><span>Facebook</span></a></li>
                            <li><a href="#"><i className="fa fa-google" /><span>Google Plus</span></a></li>
                            <li><a href="#"><i className="fa fa-twitter" /><span>Twitter</span></a></li>
                            <li><a href="#"><i className="fa fa-behance" /><span>Behance</span></a></li>
                            <li><a href="#"><i className="fa fa-dribbble" /><span>Dribbble</span></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="post-media">
                    <Link to={`/blog/${blog._id}`} className="post-views">
                      <img src={blog.imageUrl} alt="Post" />
                    </Link>
                  </div>
                  <div className="post-content">
                    {/* The Content */}
                    <div className="the-excerpt">
                      <p>
                        {blog.description}
                      </p>
                    </div>
                  </div>
                  <div className="read-more">
                    <a href="single.html">Continue Reading ...</a>
                  </div>
                </article>)
              })}

              <hr />
              {error &&
              <div style={{ color: '#900' }}>
                {error}
              </div>
              }
              {isLoading &&
              <img src={`${this.siteUrl}/images/load-icon.gif`} alt=""  className="loader"/>
              }
              {!hasMore &&
              <div>You did it! You reached the end!</div>
              }

            </div>
          </div>
        </div>
    )
  }

}
export default Debug