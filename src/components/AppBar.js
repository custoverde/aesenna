import React from 'react';
import {withRouter} from 'react-router-dom';

class AppBar extends React.Component {

  render(){
    const {onOpenMenu, history} = this.props;
    return (
      <div className="app-bar">
        <div className="app-bar__container">
        <button className="app-bar__action" onClick={onOpenMenu}>
          <i className="material-icons">menu</i>
        </button>
        <button className="app-bar__action" onClick={()=>{history.push('/');}}>
          <i className="material-icons">home</i>
        </button>
        <span className="app-bar__brand"> Auto Escola Senna</span>
        </div>
      </div>
    );
  }
}

export default withRouter(AppBar);
