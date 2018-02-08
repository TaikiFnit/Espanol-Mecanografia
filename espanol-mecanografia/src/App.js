import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'superagent';
import { link, lstat } from 'fs';

import {pinkA200, white, darkBlack, cyan500,  fullBlack, fullWhite, grey100, grey500, grey300, grey900, grey800, grey700, blue600} from 'material-ui/styles/colors';
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
    this.state = {'registers': {}, 'domains': {}, 'lexicalcategories': {}, 'server_words': [], 'order': 0, 'user': "", 'wordlist': [], 'applied': {'registers': {}, 'domains': {}, 'lexicalcategories': {}}};
    this.onClickRegister = this.onClickRegister.bind(this);

    this.url = 'http://localhost:8080/api';
    this.onClickFilter = this.onClickFilter.bind(this);
    this.getWordList = this.getWordList.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickFilter(e, category, key) {
    let newState = this.state.applied[category]
    if(key in newState) {
      delete newState[key]
    } else {
      newState[key] = key
    }

    this.setState(newState)
  }

  getWordList() {
    let filter = "";

    if ( Object.keys(this.state.applied.registers).length != 0) {
      filter += "registers="
    }
    Object.keys(this.state.applied.registers).forEach((key)=> {
      filter += (key + ",")
    })

    if ( Object.keys(this.state.applied.registers).length != 0) {
      filter += ";"
    }



    if ( Object.keys(this.state.applied.domains).length != 0) {
      filter += "domains="
    }
    Object.keys(this.state.applied.domains).forEach((key)=> {
      filter += (key + ",")
    })

    if ( Object.keys(this.state.applied.domains).length != 0) {
      filter += ";"
    }



    if ( Object.keys(this.state.applied.lexicalcategories).length != 0) {
      filter += "lexicalcategories="
    }
    Object.keys(this.state.applied.lexicalcategories).forEach((key)=> {
      filter += (key + ",")
    })

    if ( Object.keys(this.state.applied.lexicalcategories).length != 0) {
      filter += ";"
    }

    console.log(filter)


    request.get(this.url + "?path=/wordlist/es/" + filter)
    .end((err, res) => {
      if (err) {
        console.log(err)
        return
      }

      console.log(res.body.results)

      if(res.body.results) {
        this.setState({'wordlist': res.body.results, 'order': 0})
      }
    })
  }

  componentDidMount() {
    request
      .get(this.url + "?path=/registers/es")
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }

        if(res.body.results) {
          this.setState({'registers': res.body.results})
        }
      })

      request
      .get(this.url + "?path=/domains/es")
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }

        if(res.body.results) {
          this.setState({'domains': res.body.results})
        }
      })

      request
      .get(this.url + "?path=/lexicalcategories/es")
      .end((err, res) => {
        if (err) {
          console.log(err)
          return
        }

        if(res.body.results) {
          this.setState({'lexicalcategories': res.body.results})
        }
      }) 

  }

  onChangeText(e) {

    console.log(this.state.user)
    if (this.state.wordlist.length == 0) {
      return
    }

    if (e.target.value == decodeURI(this.state.wordlist[this.state.order].id)) {
      this.setState({order: (this.state.order + 1), typing: ""})

      if (this.state.user != "") {
        request
        .post("http://localhost:8080/words")
        .type('form')
        .send({"user_id": this.state.user, "word_id": e.target.value})
        .end((err, res) => {
          if (err) {
            console.log(err)
            return
          }
        })  
      }

    }else {
     this.setState({"typing": e.target.value })
    }
  }

  onChangeUser(e) {
    this.setState({user: e.target.value})
    console.log(e.target.value)
  }

  onClickLogin(e) {
    console.log("onClickLogin")
    console.log(this.state.user)
    request
    .get("http://localhost:8080/words?user_id=" + this.state.user)
    .end((err, res) => {
      console.log(res.body)
      if (err) {
        console.log(err)
        return
      }
     this.setState({'server_words': res.body})
    })  
  }

  render() {
    let registers = []
    let domains = []
    let lexicalcategories = []

    Object.keys(this.state.registers).forEach((key)=> {
      const applied_registers = this.state.applied.registers
      const applied_styles = (key in applied_registers) ? {margin: 5, backgroundColor: 'rgba(33, 150, 243, 0.6)'} : {margin: 5} ;
      registers.push(<Chip style={applied_styles} key={key} onClick={(e) => {
        this.onClickFilter(e, "registers", key)
      }}>{key}
      </Chip>)
    })

    Object.keys(this.state.lexicalcategories).forEach((key)=> {
      const applied = this.state.applied.lexicalcategories
      const applied_styles = (key in applied) ? {margin: 5, backgroundColor: 'rgba(33, 150, 243, 0.6)'} : {margin: 5} ;
      lexicalcategories.push(<Chip style={applied_styles} key={key} onClick={(e) => {
        this.onClickFilter(e, "lexicalcategories", key)
      }}>{key}
      </Chip>)
    })

    Object.keys(this.state.domains).forEach((key)=> {
      const applied = this.state.applied.domains
      const applied_styles = (key in applied) ? {margin: 5, backgroundColor: 'rgba(33, 150, 243, 0.6)'} : {margin: 5} ;
      domains.push(<Chip style={applied_styles} key={key} onClick={(e) => {
        this.onClickFilter(e, "domains", key)
      }}>{key}
      </Chip>)
    })

    console.log(this.state.server_words)


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(merge(darkBaseTheme, muiTheme))}>
        <AppBar title="Español Mecanografía" style={{marginBottom: 60, color: fullWhite}} titleStyle={{color: fullWhite}}/>

        <div className="columns is-mobile" style={{marginBottom: 120}}>
        <Card style={{background: grey800}} className="column is-8 is-offset-2" >

          <CardTitle title="Filter Setting" subtitle="Choose word filter you want to apply" />

          <Toolbar style={{height: 'auto', paddingTop: 5, paddingBottom: 5, marginBottom: 5, justifyContent: 'flex-start' }}>
            <ToolbarGroup>
              <ToolbarTitle text="Registers: " style={{color: fullWhite}}/>
            </ToolbarGroup>

            <ToolbarGroup lastChild={true}>
              <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                {registers}
              </div>
            </ToolbarGroup>
          </Toolbar>

          <Toolbar style={{height: 'auto', paddingTop: 5, paddingBottom: 5, marginBottom: 5, justifyContent: 'flex-start'}}>
            <ToolbarGroup>
              <ToolbarTitle text="Lexicals: " style={{color: fullWhite, width: 100}}/>
            </ToolbarGroup>

            <ToolbarGroup style={{height: 'auto'}}>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {lexicalcategories}
              </div>
            </ToolbarGroup>
          </Toolbar>

          <Toolbar style={{height: 'auto', paddingTop: 5, paddingBottom: 5, marginBottom: 5, justifyContent: 'flex-start'}}>
            <ToolbarGroup>
              <ToolbarTitle text="Domains:" style={{color: fullWhite, width: 100}}/>
            </ToolbarGroup>

            <ToolbarGroup style={{height: 'auto'}}>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {domains}
              </div>
            </ToolbarGroup>
          </Toolbar>

          <CardActions>
            <FlatButton label="¡Empezar!" className="column is-12" style={{fontSize: '30px', fontWeight: 'bold', height: '60px'}} onClick={this.getWordList}/>
          </CardActions>
        </Card>
        </div>

        <div className="columns is-mobile" style={{marginBottom: 120}}>
        <Card style={{background: grey800, paddingBottom: 60}} className="column is-8 is-offset-2" >

          <CardTitle title={ this.state.wordlist.length + " words Found!" } subtitle={this.state.order + " / " + this.state.wordlist.length + " completed."} />

          <div style={{width: '100%',  textAlign:'center', paddingTop: 0, fontSize: 100, paddingBottom: 60}}>{(this.state.wordlist.length != 0 && this.state.wordlist.length != this.state.order) ? decodeURI(this.state.wordlist[this.state.order].id): ""}</div>

          <div style={{width: '100%', textAlign: 'center'}}>
          <input type="text" style={{background: 'none', borderColor: '#ddd', borderWidth: 1, paddingTop: 10, paddingBottom: 10, width: '70%', display: 'inline-block', fontSize: 32, color: 'white'}} onChange={this.onChangeText} value={this.state.typing}/>
          </div>
        </Card>
        </div>

        <div className="columns is-mobile" style={{marginBottom: 360}}>
        <Card style={{background: grey800}} className="column is-8 is-offset-2" >

          <CardTitle title="History" subtitle="type your user id"/>
          <div style={{width: '100%', textAlign: 'center'}}> 
          <input type="text" style={{background: 'none', borderColor: '#ddd', borderWidth: 1, paddingTop:5, paddingBottom: 5, width: '70%', display: 'inline-block', fontSize: 15, color: 'white'}} onChange={this.onChangeUser} value={this.state.user} placeHolder="id"/>
          </div>


          <CardActions>
            <FlatButton label="Login!" className="column is-12" style={{fontSize: '30px', fontWeight: 'bold', height: '60px'}} onClick={this.onClickLogin}/>
          </CardActions>

          <CardText>
            <ul>
          {this.state.server_words.map((data) => {
            return <li>{decodeURI(data)}</li>;
           })}
           </ul>
          </CardText>
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
      });
  }
}

export default App;
