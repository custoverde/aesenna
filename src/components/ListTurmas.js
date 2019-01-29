import React from 'react';

import ListItemTurma from './ListItemTurma';

class ListTurmas extends React.Component {
  render() {
    const { turmas, dic, onDelete, onEdit } = this.props;

    return (
      <div className="list">
        {turmas.map((turma, index) => {
          let alunosTotal = 0;

          console.log('dic', dic, 'turmaid', turma.id);
          if (dic.has(turma.id)) {
            console.log('chegou');
            alunosTotal = dic.get(turma.id);
          }

          return (
            <ListItemTurma
              key={turma.id}
              turma={turma}
              onEdit={onEdit}
              onDelete={onDelete}
              index={index}
              alunosTotal={alunosTotal}
              total={turmas.length}
            />
          );
        })}
      </div>
    );
  }
}

export default ListTurmas;
