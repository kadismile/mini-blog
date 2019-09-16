import React from 'react'
import axios from 'axios'
import toastr from "toastr";


class EditBlog extends React.Component {

  state= {
    title: '',
    author: '',
    category: '',
    description: '',
    categoryId: "",
    file:'',
    _id: ''
  };
  siteUrl = process.env.REACT_APP_PUBLIC_URL;

  componentDidMount(){
    const {pathname } = this.props.location;
    var arr = pathname.split('/');
    const _id  = arr[3];
    this.setState({_id});
    axios.get(`${this.siteUrl}/blogs/${_id}`)
      .then((response) => {
        console.log(response.data);
        this.setState(
          {title: response.data.title,
           author: response.data.author,
            category: response.data.category ,
            description: response.data.description,
            file: response.data.imageUrl,
        })
      }).catch((error) => {
      console.log(error)
    });
  }

  submitPost = (e)=>{
    e.preventDefault();
    const {title, author, category, description, categoryId, file, _id
    } = this.state;
    console.log("JJJ ",file);
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
    console.log(this.state)
    let data = {...this.state, }
    axios.post(`${this.siteUrl}/blogs/${_id}`,formData, config)
      .then((response) => {
        toastr.success("Post Updated Successfully");
      }).catch((error) => {
      console.log(error);
      toastr.error("An error occured");
    });
  };

  disableButton = ()=>{
    const {title, author,description } = this.state;
    return !!
        (title === '') ||
      (author === '') ||
      (description === '');
  };

  render() {
    const {title, author, description} = this.state;
    console.log("title ", this.state.title)
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

                  <form action="#" className="contact" style={{marginTop: '10px'}} encType="multipart/form-data">
                    <div className="contact-item">
                      <label>Title *</label>
                      <input name="author" onChange={(e)=> {this.setState({title: e.target.value}) }} defaultValue={title} type="text" />
                    </div>
                    <div className="contact-item">
                      <label>Author *</label>
                      <input name="email"  onChange={(e)=> {this.setState({author: e.target.value}) }} defaultValue={author} type="email" />
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
                      <label>Upload Image*</label>
                      <input type='file' id='single' onChange={(e)=> {this.setState({file: e.target.files[0]}) }} />
                    </div>
                    <div className="contact-item">
                      <label>Message *</label>
                      <textarea name="comment" type="text" onChange={(e)=> {this.setState({description: e.target.value}) }}  value={description}  />
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

export default EditBlog