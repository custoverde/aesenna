import React from "react";
import classNames from "classnames";

class ListItemAlunosTurma extends React.Component {
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
    //this.props.onEdit(this.props.aluno.id, this.input.value);
  };

  render() {
    const { aluno, onDelete, onEdit } = this.props;
    const { isEditing }  = this.state;
    return (
      <div className="list__item">
        {isEditing ? (
          <input
            type="text"
            className="list__item__input"
            defaultValue={aluno.nome}
            ref={c => {
              this.input = c;
            }}
          />
        ) : (
          <span className="list__item__text">{aluno.nome}</span>
        )}
        {isEditing && (
          <React.Fragment>
            <button className="list__item__button list__item__button--red" onClick={this.handleCancel}>
              <i className="material-icons">cancel</i>
            </button>
            <button className="list__item__button list__item__button--green" onClick={this.handleSave}>
              <i className="material-icons">done_outline</i>
            </button>
          </React.Fragment>
        )}
        <button disabled={isEditing} className="list__item__button" onClick={this.handleEdit}>
          <i className="material-icons">edit</i>
        </button>
        <button
          disabled={isEditing}
          className="list__item__button"
          onClick={() => {
            onDelete(aluno.id);
          }}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    );
  }
}

export default ListItemAlunosTurma;