import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Calendar from './components/HomeCalendar'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import './App.css';
import UserProfile from './components/UserProfile'

class App extends React.Component {

  

  render(){
    console.log(this.props)
    return (
      <>
      <NavBar />
      <SideBar />
        <Switch>
          <Route path="/users/:id" render={(routerProps) => {
              const id = parseInt(routerProps.match.params.id)
              let user
              if (this.props.followedUsers.length > 0) {
                user = this.props.followedUsers.filter(user => user.id === id)
                return <UserProfile user={user}/>
              } else {
                return <div style={{margin: "15% 47% 0%"}} class="ui segment">
                  <div class="ui active transition visible dimmer">
                    <div class="content"><div class="ui loader"></div>
                    </div>
                    </div><img src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" class="ui image"/></div>
              }

                
              }}/>
          <Route path="/" exact render={() => {
                return <Calendar />
              }}/>
        </Switch>
      </>
    );
  }
}

const msp = (state) => {
  return {followedUsers: state.followedUsers}
}

export default connect(msp)(App);
