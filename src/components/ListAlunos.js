import React from 'react';

import ListItemAluno from './ListItemAluno';

class ListAlunos extends React.Component {
  render() {
    const { alunos, onDelete, onEdit } = this.props;

    return (
      <div className="list">
        {alunos.map((aluno, index) => (
          <ListItemAluno
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

export default ListAlunos;
