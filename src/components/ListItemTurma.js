import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

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
    this.handleCancel();
    console.log('id', this.props.turma.id,'value',this.input.value);
    this.props.onEdit(this.props.turma.id, this.input.value);
  };


  render() {
    const { turma, onDelete, alunosTotal, history } = this.props;
    const { isEditing } = this.state;
    return (
      <div className="list__item">
        {isEditing ? (
          <input
            type="text"
            className="list__item__input"
            defaultValue={turma.nome}
            ref={c => {
              this.input = c;
            }}
          />
        ) : (
          <span className="list__item__text">{turma.nome}</span>
        )}
        {isEditing && (
          <React.Fragment>
            <button
              className="list__item__button list__item__button--red"
              onClick={this.handleCancel}
            >
              <i className="material-icons">cancel</i>
            </button>
            <button
              className="list__item__button list__item__button--green"
              onClick={this.handleSave}
            >
              <i className="material-icons">done_outline</i>
            </button>
          </React.Fragment>
        )}
        <button
          disabled={isEditing}
          className="list__item__button"
          onClick={this.handleEdit}
        >
          <i className="material-icons">edit</i>
        </button>
        <button
          disabled={isEditing}
          className="list__item__button"
          onClick={() => {
            history.push(`turmas/alunos/${turma.id}`);
          }}
        >
          <i className="material-icons">person</i>
        </button>
        <button
          disabled={isEditing}
          className="list__item__button"
          onClick={() => {
            onDelete(turma.id);
          }}
        >
          <span>{alunosTotal}</span>
          <i className="material-icons">delete</i>
        </button>
      </div>
    );
  }
}

export default withRouter(ListItemTurma);
