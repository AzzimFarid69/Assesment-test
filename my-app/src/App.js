import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FirstScreen from './screen/FirstScreen';
import SecondScreen from './screen/SecondScreen';



export default function App() {
  return (
    <Router>
      <div>
        <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/hourly/:lat/:lng?' component={SecondScreen}/>
            <Route path='/' component={FirstScreen} />
          </Switch>
      </div>
    </Router>
  )
}
