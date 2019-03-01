import React, { Component } from 'react';
const querystring = require('querystring');  
const axios = require("axios");

export default class Edit extends Component {
    state = {};
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
        error: '',
        success: ''
      });
    }

    componentDidMount() {
       // const { fullName, email, password, profileimage } = this.state;
        var obj = this.props.location.state.detail;
        console.log("getProfileByid:"+obj._id);
        var token = localStorage.getItem('token');
        if(obj._id!=undefined){
        fetch('http://localhost:3001/api/profileById?id='+ obj._id,{
            method: 'GET',
            headers: {
              'x-access-token': token
            }
        }).then(res => res.json()) .then(res => {
            console.log("Responce of login"+res.email)
            this.setState({ 
                fullName:res.fullName, email:res.email, password:res.password, profileimage:res.profileimage, id:res._id});
                console.log("!this.state.isHidden",!this.state.isHidden);
                this.setState({
                  isHidden: !this.state.isHidden
                })
        }).catch(function (error) {
                console.log(error);
            })
      }else{
          
      }
    }
      handleImageChange = (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            profileimage: reader.result
          });
        }
    
        reader.readAsDataURL(file)
      }
  
    onSubmit = (e) => {

      if(this.state.fullName==undefined || this.state.fullName==""){
        this.setState({error: true, errorMessage: "Name should not be null."});
        return;
      }
      if(this.state.email==undefined || this.state.email==""){
        this.setState({error: true, errorMessage: "Email should not be null."});
        return;
      }
      if(this.state.password==undefined || this.state.password==""){
        this.setState({error: true, errorMessage: "Password should not be null."});
        return;
      }
      var token = localStorage.getItem('token');
      e.preventDefault();
      let config = {
        headers: {
          'x-access-token': token
        }
      }
      const { fullName, email, password, profileimage} = this.state;
      this.state._id = this.props.match.params._id;
      console.log("Inside onSubmit",this.state.id);
      axios.put('http://localhost:3001/api/profileupdate?id='+this.state.id, {
        fullName, email, password, profileimage
      },config) .then(res =>{
        if(res.status==200){
          this.setState({success: res.data.success, successmessage:res.data.message });
          this.setState({
            fullName: '',
            email:'',
            password:'',
            profileimage:'',
          })
        }
      }).catch(console.log);

    }
    
    onSubmitDeleteProfile = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/api/deleteprofile?id='+this.state.id,{
          method:'DELETE',
        }).then(res => {
          console.log("Profile deleted successfully.")
          this.props.history.push({
          pathname: '/index/'
          })
      }).then(console.log).catch(function (error) {
        console.log(error);
      })
      }

    render() {
        let {profileimage} = this.state;
        console.log(this.state)
        let $imagePreview = null;
        let $validationerror = null;
        let $registeredsucessfull = null;
        let $logoutbtn = null;
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
        if(this.state.ishidden){
          $logoutbtn  = <i className="logoutbtn" style={{visibility:'visible'}} />
        }
        return (
         
            <div style={{marginTop: 11}}>
                <h3>Edit Profile</h3>
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
                        <input type="file" className="form-control" name="profileimage" src={this.state.profileimage || null} onChange={this.handleImageChange}/>
                        <div className="imgPreview">{$imagePreview}</div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Profile" className="btn btn-primary" onClick={this.onSubmit} />
                        <span/><input type="submit" value="Delete Profile" className="btn btn-primary" onClick={this.onSubmitDeleteProfile} />
                    </div>
                    <div className="form-group">                
                    </div>
            </div>
        )
    }
}