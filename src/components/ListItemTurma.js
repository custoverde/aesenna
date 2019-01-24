import React from "react";
import classNames from "classnames";
import { notEqual } from "assert";

class ListItemTurma extends React.Component {
  state = {
    isEditing: false
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleSave = () => {
    handleCancel();
    this.props.onEdit(this.props.turma.id, this.input.value);
  };

  render() {
    const { turma, onDelete, onEdit } = this.props;

    return (
      <div className="list__item">
        {isEditing ? (
          <input
            type="text"
            className="list__item__input"
            defaultValue={turma.text}
            ref={c => {
              this.input = c;
            }}
          />
        ) : (
          <span className="note__text">{turma.text}</span>
        )}
      </div>
    );
  }
}

export default ListItemTurma;
