import { Switch, Route } from 'react-router-dom'
import Calendar from './components/HomeCalendar'
import NavBar from './components/NavBar'
import './App.css';

function App() {
  return (
    <>
    <NavBar />
      <Switch>
        <Route path="/" render={() => {
          return <Calendar />
        }}/>
      </Switch>
    </>
  );
}

export default App;
