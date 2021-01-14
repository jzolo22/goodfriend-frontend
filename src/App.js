import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Calendar from './components/HomeCalendar'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import './App.css';

class App extends React.Component {

  

  render(){
    return (
      <>
      <NavBar />
      <SideBar />
        <Switch>
          <Route path="/" render={() => {
            return <Calendar />
          }}/>
        </Switch>
      </>
    );
  }
  
}

export default App;
