import React, { Component } from 'react';

export default class Logout extends Component {

    state = {}
    // result= false;
    componentDidMount() {
     // if (result) {
        this.props.history.push({
          pathname: '/index',
        })
    //  }
    }
    handleok = (e) =>{
      this.props.history.push({
        pathname: '/index/',
      })
    }
    render(){
      const result = window.confirm('Are you sure to logout?')
      console.log(result);

   
      return{
      }
    }
  }