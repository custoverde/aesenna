import React from "react";

import ListItemTurma from "./ListItemTurma";

class ListTurmas extends React.Component {
  render() {
    const { turmas, onDelete, onEdit } = this.props;
    <div className="list">
      {turmas.map((turma, index) => (
        <ListItemTurma
          key={turma.id}
          turma={turma}
          onEdit={onEdit}
          onDelete={onDelete}
          index={index}
          total={turmas.length}
        />
      ))}
    </div>;
  }
}

export default ListTurmas;
