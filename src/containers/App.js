import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Alunos from './Alunos';
import Turmas from './Turmas';
import AlunosTurma from './turmas/AlunosTurma';

import AppBar from '../components/AppBar';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <AppBar />
          <Fragment>
            <Route path="/" exact component={Alunos} />
            <Route path="/alunos" component={Alunos} />
            <Route path="/turmas" component={Turmas} />
            <Route path="/turmas/alunos" component={AlunosTurma} />
          </Fragment>
        </div>
      </Router>
    );
  }
}

export default App;
