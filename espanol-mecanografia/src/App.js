import React, { Component } from 'react';
import './App.css';
import request from 'superagent';

import { fullWhite,  grey900, grey800, grey700,} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {AppBar, IconButton, MenuItem, Chip} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';


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
    const url = new URL(document.getElementById('root').baseURI)
    var user_id = url.searchParams.get("id");
    this.user_id = user_id;
    this.state = {'open': false, 'open_message': "", 'registers': {}, 'domains': {}, 'lexicalcategories': {}, 'server_words': [], 'order': 0, 'user': "", 'wordlist': [], 'applied': {'registers': {}, 'domains': {}, 'lexicalcategories': {}}};

    this.url = 'http://localhost:8080/api';
    this.onClickFilter = this.onClickFilter.bind(this);
    this.getWordList = this.getWordList.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

    request.get(this.url + "?path=/wordlist/es/" + filter)
    .end((err, res) => {
      if (err) {
        console.log(err)
        return
      }

      if(res.body.results) {
        this.setState({'wordlist': res.body.results, 'order': 0, 'open': true, 'open_message': res.body.results.length + " words found"})
      } else {
        this.setState({'open': true, 'open_message': "0 words found. Change your filter."})
      }
    })
  }

  componentDidMount() {

    this.onClickLogin()

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

    if (this.state.wordlist.length == 0) {
      return
    }

    if (e.target.value == decodeURI(this.state.wordlist[this.state.order].id)) {
      this.setState({order: (this.state.order + 1), typing: ""})

      if (this.user_id != "") {
        request
        .post("http://localhost:8080/words")
        .type('form')
        .send({"user_id": this.user_id, "word_id": e.target.value})
        .end((err, res) => {
          if (err) {
            console.log(err)
            return
          }

          this.onClickLogin()
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
    console.log(this.user_id)
    request
    .get("http://localhost:8080/words?user_id=" + this.user_id)
    .end((err, res) => {
      console.log(res.body)
      if (err) {
        console.log(err)
        return
      }
     this.setState({'server_words': res.body})
    })  
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

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

          <CardTitle title="History"/>
          <CardText>
            <ul>
          {this.state.server_words.map((data) => {
            return <li>{decodeURI(data)}</li>;
           })}
           </ul>
          </CardText>
        </Card>
        </div>

        <Snackbar
          open={this.state.open}
          message={this.state.open_message}
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />

      </MuiThemeProvider>
    );
  }
}

export default App;
