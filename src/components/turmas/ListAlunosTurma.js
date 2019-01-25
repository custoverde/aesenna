import React from 'react';

import ListItemAlunosTurma from './ListItemAlunosTurma';

class ListAlunosTurma extends React.Component {
  render() {
    const { alunos, onDelete, onEdit } = this.props;

    return (
      <div className="list">
        {alunos.map((aluno, index) => (
          <ListItemAlunosTurma
            key={aluno.id}
            aluno={aluno}
            onEdit={onEdit}
            onDelete={onDelete}
            index={index}
            total={alunos.length}
          />
        ))}
      </div>
    );
  }
}

export default ListAlunosTurma;
