import React from 'react';
import { Link,Navigate} from 'react-router-dom';
import axios from 'axios';
import Form from '../form.js';
import '../form.css';
class SignIn extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: '',
          password: '',
          token: '' ,
          navigate: localStorage.getItem('userTokenTime') ? true : false
        }
    
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this);
        this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this);
      }
    
      onSubmitHandler() {
        if (!(this.state.email === '' || this.state.password === '')
          && (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
          axios.post('/api/signIn', {
            email: this.state.email,
            password: this.state.password
          }).then(res => {
            this.setState({
              token: res.data.token
            });
            const data = {
              token: this.state.token,
               time: new Date().getTime()
            }
            localStorage.setItem('userTokenTime', JSON.stringify(data));
            this.setState({
              navigate: false
            });
            console.log(this.state.token);
           }).catch(err => {
            console.log(err);
          });
        } else {
          alert('Please enter valid details');
        }
      }
    
      emailInputChangeHandler(event) {
        this.setState({
          email: event.target.value,
         
        });
      }
    
      passwordInputChangeHandler(event) {
        this.setState({
          password: event.target.value
        });
      }
    render() {
      if (this.state.navigate) return <Navigate to="/" />;
       return(
        <Form onSubmit={this.onSubmitHandler.bind(this)}>
        <h3 className="text-center text-success">Login</h3>
        <div className="form-group">
          <label htmlFor="email" className="text-success">Email:</label><br />
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="example@domain.com"
            onChange={this.emailInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-success">Password:</label><br />
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="********"
            onChange={this.passwordInputChangeHandler}
            required />
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <button onClick={this.onSubmitHandler} className="btn btn-success btn-md" type="button" style={{marginTop:'10px'}}>Submit</button>
          <Link to="/" className="text-success">Press to Login</Link>
          <Link to="/signUp" className="text-success">Sign Up here</Link>
        </div>
      </Form>
       ) 
    }
}

export default SignIn;