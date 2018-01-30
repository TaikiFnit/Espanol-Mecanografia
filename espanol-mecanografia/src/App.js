import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import { link } from 'fs';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {"registers": {}}
  }

  componentDidMount() {
    const url = 'http://localhost:8080/registers'
    request
      .get(url)
      .end((err, res) => {
        console.log(err);
        console.log(res.body);
        if(res.body.results) {
          this.setState({"registers": res.body.results})
        }
      })
  }

  render() {

    let register_list = []

    Object.keys(this.state.registers).forEach((key)=> {
      register_list.push(<li>{key}</li>)
    })

    return (
      <ul>
        {register_list}
      </ul>
    );
  }
}

export default App;
