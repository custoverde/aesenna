import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

class NagitationDrawer extends React.Component {
  render() {
    const { isOpen, onCloseMenu, history } = this.props;
    return (
      <div
        className={classNames("navigation-drawer", {
          "navigation-drawer--open": isOpen
        })}
      >
        <div className="navigation-drawer__head">
          <span className="navigation-drawer__head__title">Menu de Opçoes</span>
          <button
            className="navigation-drawer__head__button"
            onClick={onCloseMenu}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="navigation-drawer__menu">
        <button
            className="navigation-drawer__menu__item"
            onClick={() => {
              onCloseMenu();
              history.push("/");
            }}
          >
            <i className="material-icons">home</i> Página Inicial
          </button>

          <button
            className="navigation-drawer__menu__item"
            onClick={() => {
              onCloseMenu();
              history.push("/alunos");
            }}
          >
            <i className="material-icons">person</i> Alunos
          </button>
          <button
            className="navigation-drawer__menu__item"
            onClick={() => {
              onCloseMenu();
              history.push("/turmas");
            }}
          >
            <i className="material-icons">class</i> Turmas
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(NagitationDrawer);
