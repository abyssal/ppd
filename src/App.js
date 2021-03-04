import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PronounView from './pronouns/PronounView';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">The Progressive Pronoun Directory</div>
        <Switch>
          <Route path="/:pronounId" children={<PronounView />}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
