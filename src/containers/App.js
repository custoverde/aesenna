import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Home';
import Alunos from './Alunos';
import Turmas from './Turmas';
import AlunosTurma from './turmas/AlunosTurma';

import AppBar from '../components/AppBar';
import NavigationDrawer from '../components/NavigationDrawer';

class App extends React.Component {
  state = {
    isMenuOpen: false
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const { isMenuOpen } = this.state;
    return (
      <Router>
        <div>
          <AppBar onOpenMenu={this.handleOpenMenu}/>
          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/alunos" component={Alunos} />
            <Route path="/turmas" exact component={Turmas} />
            <Route path="/turmas/alunos/:id" component={AlunosTurma} />
          </Fragment>
          <NavigationDrawer isOpen={isMenuOpen} onCloseMenu={this.handleCloseMenu}/>
        </div>
      </Router>
    );
  }
}

export default App;
