import React from 'react';
import './customers.css';
import socketIO from 'socket.io-client'


class Customers extends React.Component{

  constructor(){
    super();
    this.state = {
      posts: [],
      message: ''
    }
  }
  socket = socketIO("http://localhost:4000/");
  componentDidMount() {
    fetch('/posts')
      .then(res => res.json())
      .then(posts => this.setState({posts}, ()=> console.log(" data as been fetched properly", posts)))
  }

  textInput = (e)=> {
    this.setState({message: e.target.value})
  };
  submitForm =(e) => {
    e.preventDefault();
    this.socket.emit('greet', {paylod: this.state.message});
    this.setState({message: ''})
  };

  render() {

    return (
      <div >
        <h2>Customers</h2>
        <ul>
          {this.state.posts.map((post)=>{
            return (<li key={post._id}> {post.title} </li>)
          })}
        </ul>


        <form action="">
          <input value={this.state.message} onChange={this.textInput} type="text"/>

        </form>
        <button onClick={this.submitForm}> CLICK ME </button>


      </div>
    );
  }

}

export default Customers;
