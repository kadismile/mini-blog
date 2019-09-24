import React from 'react'
import Disqus from "disqus-react";
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";

import './viewblog.css'


class ViewBlog extends React.Component{

  state= {
    slug: '',
    blog: [],
    redirect: false,
    loading: true
  };
  serverUrl = process.env.REACT_APP_SERVER_URL;
  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  async componentDidMount (){
    const {pathname } = this.props.location;
    var arr = pathname.split('/');
    const slug  = arr[2];
    this.setState({slug});
    await axios.get(`${this.serverUrl}/blogs/${slug}`)
      .then((response) => {
        setTimeout(()=>{
          this.setState({blog: response.data, loading: false}) ;
        }, 500);
      }).catch((error) => {
      console.log(error)
    });
  }

  render(){
    const {blog, loading} = this.state;
    const disqusShortname = "mini-blog-1";
    const disqusConfig = {
      url: `http://0440f05d.ngrok.o" + ${blog.slug}`,
      identifier: blog.slug,
      title: blog.title,
    };
    return (
      loading ? <img src={`${this.siteUrl}/images/load-icon.gif`} alt="" className="center"/> :
      <div className="col-md-9 col-md-offset-3">
        <div className="posts">
          <div className="posts-inner">
            <article className="post">
              <div className="post-header">
                <h2 className="title"><span>{blog.title}</span></h2>
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
                <img src={blog.imageUrl} alt="Post" />
              </div>
              <div className="post-content">

                {blog.description}


              </div>
            </article>
          </div>
          {/* Pagination */}
          <div className="pagination-wrap">
            <div className="older">
              <a href="#" title="The living room is too small">Prev Post <i className="fa fa-angle-double-right" /></a>
            </div>
            <div className="newer">
              <a href="#" title="They have originality "><i className="fa fa-angle-double-left" /> Next Post</a>
            </div>
          </div>
          <div id="related-posts">
            <h2 className="title"><span>Related Posts</span></h2>
            <div className="row">
              <div className="col-sm-6">
                <div className="post">
                  <div className="post-media" style={{backgroundImage: 'url(images/posts/4.jpg)'}}>
                    <a href="single.html">
                      <img src="images/posts/4.jpg" alt="Image" />
                    </a>
                  </div>
                  <div className="post-entry">
                    <h3 className="title">
                      <a href="single.html">Living Lagom in Sweden: An Interview With Lola Akerstrom</a>
                    </h3>
                    <div className="post-details">
                      <a href="#" className="post-date"><span>Aug 06, 2018</span></a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="post">
                  <div className="post-media" style={{backgroundImage: 'url(images/posts/2.jpg)'}}>
                    <a href="single.html">
                      <img src="images/posts/2.jpg" alt="Image" />
                    </a>
                  </div>
                  <div className="post-entry">
                    <h3 className="title">
                      <a href="single.html">Living Lagom in Sweden: An Interview With Lola Akerstrom</a>
                    </h3>
                    <div className="post-details">
                      <a href="#" className="post-date"><span>Aug 06, 2018</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />

        </div>
      </div>
    )
  }
}

export default ViewBlog