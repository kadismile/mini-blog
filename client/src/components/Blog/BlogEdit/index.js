import React from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import toastr from "toastr";
import LaddaButton, { XXL,EXPAND_LEFT} from 'react-ladda';


class EditBlog extends React.Component {

  state= {
    title: '',
    author: '',
    category: '',
    description: '',
    categoryId: "",
    file:'',
    slug: '',
    redirect: false,
    loading: false
  };
  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  serverUrl = process.env.REACT_APP_SERVER_URL;

  componentDidMount(){
    const {pathname } = this.props.location;
    var arr = pathname.split('/');
    const slug  = arr[3];
    console.log("SLUG ", slug)
    this.setState({slug});
    axios.get(`${this.serverUrl}/blogs/${slug}`)
      .then((response) => {
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
    const {title, author, category, description, categoryId, file, slug
    } = this.state;

    if((title === '') || (author === '') || (description === '') || (category === "")){
      toastr.error("Kindly Fill All Fields");
      return
    }
    this.setState({loading: true});
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
    axios.post(`${this.serverUrl}/blogs/${slug}`,formData, config)
      .then((response) => {
        toastr.success("Post Updated Successfully");
        setTimeout(()=>{
          this.setState({loading: false});
          this.setState({redirect: true});
        },2000);
      }).catch((error) => {
      console.log(error);
      toastr.error("An error occured");
    });
  };

  render() {
    const {title, author, description, category, redirect, loading} = this.state;
    console.log(loading)
    return redirect ? <Redirect to="/"/> : (
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
                      <textarea name="comment" type="text" onChange={(e)=> {this.setState({description: e.target.value}) }}  value={description}  />
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
                      Submit Post
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

export default EditBlog