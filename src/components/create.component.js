import React, { Component } from 'react';
const querystring = require('querystring');  
var FormData = require('form-data');
var fs = require('fs');
const axios = require("axios");
var request = require('request');

export default class Create extends Component {
  state = {}
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
        error: '',
        success: ''
      });
    }
  
    handleFileSelect = (evt) => {
      const self = this
      const key = evt.target.name
      var f = evt.target.files[0]; // FileList object
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = function() {
        self.setState({
          profileimage: reader.result
        })
      };
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

    onSubmitFormData = (e) =>{
      ///validate();
      const { fullName, email, password, profileimage} = this.state
     
      if(this.state.fullName==undefined || this.state.fullName==""){
        this.setState({error: true, errorMessage: "Please enter your Name."});
        return;
      }
      if(this.state.email==undefined || this.state.email==""){
        this.setState({error: true, errorMessage: "Please enter your EmailId."});
        return;
      }
      if(this.state.password==undefined || this.state.password==""){
        this.setState({error: true, errorMessage: "Please enter your Password."});
        return;
      }
      

      axios.post("http://localhost:3001/api/register", {
        fullName, email, password, profileimage
      }).then(res=>{
        if(res.status!=200){
          if(!res.success)
            this.state.error = res.message;
        }else if(res.status==200){
          this.setState({success: res.data.success, successmessage:res.data.message });
          this.setState({
            fullName: '',
            email:'',
            password:'',
            profileimage:'',
          });
          fetch('http://localhost:3001/api/sendemail?email='+this.state.email,{
           method:'POST',
          }).then(response=>{console.log("email testing..",response)});
      }
      }).catch((error) => {
      })
    }

    render() {
      let {profileimage} = this.state;
        console.log(this.state)
        let $imagePreview = null;
        let $validationerror = null;
        let $registeredsucessfull = null;
        if (profileimage) {
          $imagePreview = (<img src={profileimage} />);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        if(this.state.error){
          $validationerror = (<div className="input-error-msg-field" style={{color: 'red'}}>{this.state.errorMessage}</div>);
        }
        if(this.state.success){
          $registeredsucessfull = (<div className="input-error-msg-field" style={{color: 'blue'}}>{this.state.successmessage}</div>);
        }
        return (
            <div style={{marginTop: 11}}>
            {<span>{this.state.error || ''}</span>}
                <h3>Register Profile</h3>
                <div className="validationerror">{$validationerror}</div>
                <div className="registeredsucessfull">{$registeredsucessfull}</div>
                    <div className="form-group">
                        <label>Name:  </label>
                        <input type="text" className="form-control" name="fullName" value={this.state.fullName || ''}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" className="form-control" name="email" value={this.state.email || ''}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" className="form-control" name="password" value={this.state.password || ''}
                        onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label>Profile image: </label>
                        <input type="file" className="form-control" name="profileimage" onChange={this.handleFileSelect}/>
                        <div className="imgPreview">{$imagePreview}</div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary" onClick={this.onSubmitFormData} />
                    </div>
            </div>

        )
    }
}