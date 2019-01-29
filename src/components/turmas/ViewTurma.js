import React from 'react';

class ViewTurma extends React.Component {
  render() {
    const { turma } = this.props;

    return (
      <div className=".view-turma">
        <h2> Turma: </h2>
        <h1> { turma.nome} </h1>
      </div>
    );
  }
}

export default ViewTurma;
