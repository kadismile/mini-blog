import React from 'react'
import axios from 'axios'
import toastr from "toastr";


class CreateBlog extends React.Component {

  state= {
    title: '',
    author: '',
    category: '',
    description: '',
    categoryId: "2",
    file:''
  };
  siteUrl = process.env.REACT_APP_PUBLIC_URL;


  submitPost = (e)=>{
    e.preventDefault();
    const {title, author, category, description, categoryId, file
    } = this.state;
    console.log(this.state);
    return
    const formData = new FormData();
    formData.append('myImage',file);
    formData.append('title',title);
    formData.append('author',author);
    formData.append('category',category);
    formData.append('description',description);
    formData.append('categoryId',categoryId);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post(`${this.siteUrl}/blogs/create`,formData,config)
      .then((response) => {
        toastr.success("Post Created Successfully");
      }).catch((error) => {
        console.log(error)
      toastr.error("An error occured");
    });
  }

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
                <h2 className="title"><span>Create Blog</span></h2>
              </div>

              <div className="post-content">
                <div className="the-excerpt">

                  <form action="#" className="contact" style={{marginTop: '10px'}} encType="multipart/form-data">
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
                      <select value={this.state.category} onChange={(e)=>{this.setState({category: e.target.value})}}>
                        <option value="">Select Category</option>
                        <option value="Politics">Politics</option>
                        <option value="Metro">Metro</option>
                        <option value="Business">Business</option>
                        <option value="Sports">Sports</option>
                      </select>
                    </div>
                    <div className="contact-item">
                      <label>Upload Image*</label>
                      <input type='file' id='single' onChange={(e)=> {this.setState({file: e.target.files[0]}) }} />
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