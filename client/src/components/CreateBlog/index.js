import React from 'react'
import axios from 'axios'
import toastr from "toastr";


class CreateBlog extends React.Component {

  state= {
    title: '',
    author: '',
    category: '',
    description: '',
    categoryId: "2"
  };
  siteUrl = process.env.SITE_URL;
  componentDidMount(){
    console.log("CONSOLE ",process.env.SITE_URL)
  }
  submitPost = (e)=>{
    e.preventDefault();
    axios
      .post(`${this.siteUrl}/blogs/create`, this.state)
      .then(response => {
        toastr.success("Post Created Successfully");
      })
      .catch(error => {
        toastr.error("An error occured");
        console.log("Error ", error);
      });
    console.log(this.state, this.siteUrl)
  };

  disableButton = ()=>{
    return !!
      (this.state.title === '') ||
      (this.state.author === '') ||
      (this.state.description === '');
  };

  render() {
    return (
      <div className="col-md-9 col-md-offset-3">
        <div className="posts">
          <div className="posts-inner">
            <article className="post">
              <div className="post-header">
                <h2 className="title"><span>Post A Blog</span></h2>
              </div>

              <div className="post-content">
                <div className="the-excerpt">

                  <form action="#" className="contact" style={{marginTop: '10px'}}>
                    <div className="contact-item">
                      <label>Title *</label>
                      <input name="author" onChange={(e)=> {this.setState({title: e.target.value}) }} type="text" />
                    </div>
                    <div className="contact-item">
                      <label>Author *</label>
                      <input name="email"  onChange={(e)=> {this.setState({author: e.target.value}) }} type="email" />
                    </div>
                    <div className="contact-item">
                      <label>Category</label>
                      <select>
                        <option value="volvo">Select Category</option>
                        <option value="volvo">Politics</option>
                        <option value="saab">Metro</option>
                        <option value="mercedes">Business</option>
                        <option value="audi">Sports</option>
                      </select>
                    </div>
                    <div className="contact-item">
                      <label>Message *</label>
                      <textarea name="comment" onChange={(e)=> {this.setState({description: e.target.value}) }}  />
                    </div>
                    <div className="contact-item form-submit">
                      <input name="submit" disabled={this.disableButton()} type="submit" id="submit" onClick={this.submitPost} className="submit" defaultValue="Submit" />
                    </div>
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

export default CreateBlog