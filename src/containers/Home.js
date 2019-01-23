import React from "react";
import {withRouter} from "react-router-dom";

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="home">
        <div className="home__title">
          <h1>Servicos</h1>
          <button
            className="home__title__button"
            onClick={() => {
              history.push("/turmas");
            }}
          >
            <i className="material-icons">class</i>
            <span>Aula Teórica</span>
          </button>
        </div>

        <div className="home__title">
          <h1>Cadastros</h1>
          <button
            className="home__title__button"
            onClick={() => {
              history.push("/alunos");
            }}
          >
            <i className="material-icons">person</i>
            <span>Alunos</span>
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
