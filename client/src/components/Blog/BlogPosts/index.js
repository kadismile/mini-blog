import React from 'react'
import axios from "axios";
import moment from 'moment'
import $ from 'jquery'
import { Link } from "react-router-dom";
import './blogpost.css'
class BlogPost extends React.Component {

  state = {
    blogs: [],
    loading: true,
    skip: 0,
    loadingData: false
  };

  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  serverUrl = process.env.REACT_APP_SERVER_URL;

  componentDidMount(){
    this.scrollHandler = (e)=> {
      let {skip} = this.state;
      let threshold, target = $("#showMoreResults");
      if (!target.length) return;
      threshold = $(window).scrollTop() + $(window).height() - target.height();
      if (target.offset().top < threshold) {
        if (!target.data("visible")) {
          target.data("visible", true);
          let newSkip = skip;
          newSkip += 10;
         this.setState({skip: newSkip});
          this.getData()
        }
      } else {
        if (target.data("visible")) {
          target.data("visible", false);
        }
      }
    };
    $(window).on('scroll', this.scrollHandler);
      this.getData()
  }

  getData =()=>{
    this.setState({loadingData: true});
    try{
      let {skip, blogs} = this.state;
      axios.get(`${this.serverUrl}/blogs/get/${skip}`)
        .then((response) => {
          setTimeout(()=>{
            this.setState({blogs: [...blogs, ...response.data], loading: false, loadingData: false}) ;
          }, 500)
        }).catch((error) => {
      });
    }catch (e) {
      console.log(e)
    }

  };

  render() {
    const {blogs, loading, loadingData, skip} = this.state;
    return (
      loading ? <img src={`${this.siteUrl}/images/load-icon.gif`} alt="" className="center"/> :
      <div className="col-md-9 col-md-offset-3">
        <div className="posts">
          <div className="posts-inner">
            {blogs.map((blog, key)=>{
              return ( <article className="post" key={key}>
                <div className="post-header">
                  <h2 className="title">
                    <Link to={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  <div className="post-details">
                    <div className="post-cat">
                      <a href="#">{blog.category}</a>
                    </div>
                    <a href="#" className="post-date"><span>{moment(blog.createdAt).format('MMM DD, Y')}</span></a>
                    <div className="post-details-child">
                      <Link to={`/blog/edit/${blog.slug}`} className="post-views">Edit</Link>
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
                  <Link to={`/blog/${blog.slug}`} className="post-views">
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

            <div id="showMoreResults"> </div>
            { loadingData ? <img src={`${this.siteUrl}/images/load-icon.gif`} alt=""  className="loader"/> : ''}

          </div>
        </div>
      </div>
    )
  }
}

export default BlogPost