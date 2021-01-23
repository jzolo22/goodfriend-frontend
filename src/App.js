import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Calendar from './components/HomeCalendar'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import LoginPage from './components/LoginPage'
import {checkLogin} from './redux/actions'
import './App.css';
import UserProfile from './components/UserProfile'
import NewEventForm from './components/NewEventForm'
import SignUpForm from './components/SignUpForm'
import { Dimmer, Loader } from 'semantic-ui-react'

class App extends React.Component {

  componentDidMount() {
    const token = localStorage.getItem("jwtToken")
    if (token) {
      this.props.checkLogin(token)
    } else {
      this.props.history.push('/')
    }
  }

  render(){
    console.log(this.props)
    return (
      <>
      <NavBar />
        <Switch>
        <Route exact path="/users/new" render={() => <SignUpForm />}/>
        <Route path="/users/:id" render={(routerProps) => {
              const id = parseInt(routerProps.match.params.id)
              let user
              if (this.props.allUsers.length > 0) {
                user = this.props.allUsers.filter(user => user.id === id)
                return <UserProfile user={user}/>
              } else {
                return (
                  <Dimmer active inverted>
                    <Loader inverted content='Loading' />
                  </Dimmer>
                )
              }
              }}/>
          <Route path="/events/new" render={() => <NewEventForm />}/>
          <Route path="/" exact render={() => {
                if(this.props.currentUser && this.props.currentUser.id){
                  return <Calendar />
                } else {
                  return <LoginPage />
                }
              }}/>
        </Switch>
      </>
    );
  }
}

const msp = (state) => {
  return {
    followedUsers: state.followedUsers,
    allUsers: state.allUsers,
    currentUser: state.currentUser
  }
}

const mdp = (dispatch) => {
  return {
    checkLogin: (token) => dispatch(checkLogin(token))
  }
}

export default connect(msp, mdp)(withRouter(App));
