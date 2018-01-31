import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import { link, lstat } from 'fs';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {'registers': {}, 'wordlist': {}};
    this.onClickRegister = this.onClickRegister.bind(this);

    this.url = 'http://localhost:8080';
  }

  componentDidMount() {
    request
      .get(this.url + "/registers")
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }

        if(res.body.results) {
          this.setState({"registers": res.body.results})
        }
      })
  }

  render() {
    let register_list = []

    Object.keys(this.state.registers).forEach((key)=> {
      register_list.push(<li key={key} onClick={this.onClickRegister}>{key}</li>)
    })

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="Español Mecanografía" />
      </MuiThemeProvider>
    );
  }

  onClickRegister(e) {
    request
      .get(this.url + "/wordlist")
      .query({register: e.target.innerText})
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }

        if(res.body.results) {
          console.log(res.body.results)
          this.setState({"wordlist": res.body.results})
        }
      })
  }
}

export default App;
