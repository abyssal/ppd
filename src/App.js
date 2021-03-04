import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PronounView from './pronouns/PronounView';
import HomeView from './HomeView';

function App() {
  return (
    <Router>
      <div className="App">
        <a style={{textDecoration: 'none'}} href='/'><div className="header">The Progressive Pronoun Directory</div></a>
        <div style={{
          paddingTop: '40px',
          borderBottom: '1px solid black'
        }}>
          <Switch>
            <Route exact path="/">{<HomeView />}</Route>
            <Route path="/:pronounId" children={<PronounView />}/>
          </Switch>
        </div>
        <div style={{textAlign: 'left', paddingTop: '15px'}}>
          Contribute on GitHub: <a href="https://github.com/abyssal/ppd">abyssal/ppd</a>
        </div>
      </div>
    </Router>
  );
}

export default App;
