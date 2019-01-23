import React from 'react';

class AppBar extends React.Component {
  render(){
    const {isLoading, onOpenMenu} = this.props;
    return (
      <div className="app-bar">
        <div className="app-bar__container">  
        <button className="app-bar__action" onClick={onOpenMenu}>
          <i className="material-icons">menu</i>
        </button>
        <span className="app-bar__brand"> Auto Escola Senna</span>
        </div>
      </div>
    );
  }
}

export default AppBar;
