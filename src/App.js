import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PronounView from './pronouns/PronounView';
import HomeView from './HomeView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">The Progressive Pronoun Directory</div>
        <div style={{
          paddingTop: '40px'
        }}>
          <Switch>
            <Route exact path="/">{<HomeView />}</Route>
            <Route path="/:pronounId" children={<PronounView />}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
