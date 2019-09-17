import React from 'react'
import axios from "axios";
import moment from 'moment'
import { Link } from "react-router-dom";

class BlogPost extends React.Component {

  state = {
    blogs: []
  };
  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  componentDidMount(){
    try{
      axios.get(`${this.siteUrl}/blogs`)
        .then((response) => {
          this.setState({blogs: response.data}) ;
          console.log("Blogs", )
        }).catch((error) => {
      });
    }catch (e) {
      console.log(e)
    }
  }

  render() {
    const {blogs} = this.state;
    const siteUrl = process.env.REACT_APP_PUBLIC_URL;
    return (
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

          </div>
          <div className="pagination-wrap">
            <div className="older">
              <a href="#">Older Posts <i className="fa fa-angle-double-right" /></a>
            </div>
            <div className="newer">
              <a href="#"><i className="fa fa-angle-double-left" /> Newer Posts</a>
            </div>
          </div>
          {/* End Pagination */}
        </div>
      </div>
    )
  }
}

export default BlogPost