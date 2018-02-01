import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import { link, lstat } from 'fs';

import {pinkA200, white, darkBlack, cyan500,  fullBlack, fullWhite, grey100, grey500, grey300, grey900, grey800, grey700} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {AppBar, IconButton, IconMenu, MenuItem, Chip} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import merge from 'lodash.merge';

const muiTheme = {
  palette: {
    primary1Color: grey900,
    primary2Color: grey900,
    primary3Color: grey800,
    accent1Color: grey800,
    accent2Color: grey800,
  }
}

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
      register_list.push(<Chip style={{margin: 4}}>{key}</Chip>)
    })

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(merge(darkBaseTheme, muiTheme))}>
        <AppBar title="Español Mecanografía" style={{marginBottom: 60, color: fullWhite}} titleStyle={{color: fullWhite}}/>

        <div className="columns is-mobile">
        <Card style={{background: grey800}} className="column is-8 is-offset-2" >

          <CardTitle title="Card title" subtitle="Card subtitle" />

          <Toolbar style={{marginBottom: 5}}>
            <ToolbarGroup>
              <ToolbarTitle text="Registers: " style={{color: fullWhite}}/>
            </ToolbarGroup>

            <ToolbarGroup>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {register_list}
              </div>
            </ToolbarGroup>
          </Toolbar>

          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Registers: " style={{color: fullWhite}}/>
            </ToolbarGroup>

            <ToolbarGroup>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {register_list}
              </div>
            </ToolbarGroup>
          </Toolbar>



          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="¡Empezar!" className="column is-12" style={{fontSize: '30px', fontWeight: 'bold', height: '60px'}} />
          </CardActions>
        </Card>
        </div>

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
