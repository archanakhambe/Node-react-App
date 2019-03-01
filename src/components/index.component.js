import React, { Component } from 'react';

export default class Index extends Component {
    state = {}
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state

        if(this.state.email==undefined || this.state.email==""){
          this.setState({error: true, errorMessage: "Please enter your emailId."});
          return;
        //    (<div className="input-error-msg-field">name should not be null</div>);
        }
        if(this.state.password==undefined || this.state.password==""){
          this.setState({error: true, errorMessage: "Please enter your password."});
          return;
        //    (<div className="input-error-msg-field">name should not be null</div>);
        }
        fetch('http://localhost:3001/api/login', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          })
        }).then(res => res.json())
        .then(res => {
                console.log("Response of login"+res.auth);
                var response = JSON.stringify(res);
                if(res.auth){
                  localStorage.setItem('token', res.token);
                  this.props.history.push({
                    pathname: '/edit/'+res.doc._id,
                    state: { detail: res.doc}
                  })
                }else{
                  console.log("User not found.");
                }
        }).then(console.log).catch(function (error) {
          console.log(error);
        })
      }


    render() {
        console.log(this.props)
        let $validationerror = null;
        if(this.state.error){
          $validationerror = (<div className="input-error-msg-field" style={{color: 'red'}}>{this.state.errorMessage}</div>);
        }
        return (
            <div style={{marginTop: 11}}>
                <h3>Login to harbinger Profile</h3>
                <div className="validationerror">{$validationerror}</div>
                    <div className="form-group">
                        <label>EmailId:  </label>
                        <input type="text" className="form-control" name="email" value={this.state.email || ''}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" name="password" value={this.state.password || ''}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
            </div>
        )
    }
}