import React from 'react'
import { Redirect } from "react-router-dom";
import LaddaButton, { XXL,EXPAND_LEFT } from 'react-ladda';
import axios from 'axios'
import toastr from "toastr";
import '../Blog/CreateBlog/createblog.css'


class CreateBlog extends React.Component {

  state= {
    title: '',
    author: '',
    category: '',
    description: '',
    categoryId: "2",
    file:'',
    redirect: false,
    loading: false
  };
  siteUrl = process.env.REACT_APP_PUBLIC_URL;
  serverUrl = process.env.REACT_APP_SERVER_URL;

  submitPost =  (e)=>{
    e.preventDefault();
    const {title, author, category, description, categoryId, file
    } = this.state;

    /*console.log(file);
    if((title === '') || (author === '') || (description === '') || (category === "")){
      toastr.error("Kindly Fill All Fields");
      return
    }*/
    this.setState({loading: true});
    const formData = new FormData();
    formData.append('myImage',file);
    formData.append('title',title);
    formData.append('author',author);
    formData.append('category',category);
    formData.append('description',description);
    formData.append('categoryId',categoryId);

    console.log("otijasope ")

  const  data = {
      /*"email": "koloflower@gmail.com",
      "password": "excelly200!"*/
   /* email: "unilevernigeria@tradedepot.co",
    password: "uuuuuu"*/
    "agentId":"ertyuii",
    "firstName":"Peer",
    "lastName":"Ramza",
    "phoneNumber":"09092345386",
    "countryCode":"NG",
    "longitude":2.3569813,
    "latitude":5.52897902,
    "company":"Ramza",
    "address":"3 Abolade St, Mushin, Lagos, Nigeria",
    "description":"Cool Store",
    "state":"Osun"
    };
    const api = `https://app.sandbox.tradedepot.co/api/v2/agent/register`;
    const headers = { "x-api-key": "PXqxmF9Sbr4R6tFivoFjaFxr8bpSSSv47t_test_key" };

/*
    axios.post(`localhost:3000/api/v1/authenticate/login`, data , )
      .then((response) => {
        toastr.success("Post Created Successfully");
      }).catch((error) => {
      console.log(error);
      this.setState({loading: false});
      toastr.error("An error occured ooooo");
    })

*/
   /* const userQuery =  await axios.get(api, { headers: headers });
    console.log("userQuery ", userQuery);
*/
/*
   axios.get(api, { headers: headers },{
    }).then((response) => {
      console.log(response);
        toastr.success("Post Created Successfully");
      }).catch((error) => {
        console.log(error);
        this.setState({loading: false});
        toastr.error("An error occured ooooo");
      })
*/


    let settings = {
      "async": true,
      "crossDomain": true,
      "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept, X-User-Id, X-Auth-Token, x-api-key",
      "url": `https://app.sandbox.tradedepot.co/api/v2/agent/register`,
      "method": "POST",
      "headers": {
        "x-api-key": "PXqxmF9Sbr4R6tFivoFjaFxr8bpSSSv47t_test_key",
      },
      data: {
        "agentId":"ertyuii",
        "firstName":"Peer",
        "lastName":"Ramza",
        "phoneNumber":"09092345386",
        "countryCode":"NG",
        "longitude":2.3569813,
        "latitude":5.52897902,
        "company":"Ramza",
        "address":"3 Abolade St, Mushin, Lagos, Nigeria",
        "description":"Cool Store",
        "state":"Osun"
      }
    };


    axios(settings).then((response) => {
     console.log(response)
    }).catch((error) => {
      console.log("ERROR", error);
    });

  };

  disableButton = ()=>{
    return !!
        (this.state.title === '') ||
      (this.state.author === '') ||
      (this.state.description === '');
  };

  render() {
    const {redirect, loading} = this.state;
    return redirect ? <Redirect to="/"/> :  (
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

export default CreateBlog