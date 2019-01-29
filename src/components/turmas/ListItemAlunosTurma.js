import React from 'react';
import classNames from 'classnames';

class ListItemAlunosTurma extends React.Component {

  render() {
    const { aluno, onPorNaTurma, onTirarDaTurma } = this.props;
    const isPendenteTurma  = aluno.turmaId <= 0;
    return (
      <div className="list__item">
        <span className="list__item__text">{aluno.nome}</span>
        {isPendenteTurma ? (
          <button
            className="list__item__button list__item__button--red"
            onClick={() => {onPorNaTurma(aluno.id)}}
          >
            <i className="material-icons">cancel</i>
          </button>
        ) : (
          <button
            className="list__item__button list__item__button--green"
            onClick={() => {onTirarDaTurma(aluno.id)}}
          >
            <i className="material-icons">done_outline</i>
          </button>
        )}
      </div>
    );
  }
}

export default ListItemAlunosTurma;
