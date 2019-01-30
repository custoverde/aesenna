import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AlunoService from '../services/AlunoService';
import ListAlunos from '../components/ListAlunos';
import NewAluno from '../components/NewAluno';

class Alunos extends React.Component {
  state = {
    isLoading: false,
    reloadHasError: false,
    alunos: []
  };

  componentDidMount() {
    this.handleReload();
  }

  componentDidUpdate() {
    const { isLoading } = this.state;
    if (isLoading) {
      toast('Carregando');
    } else {
      toast.dismiss();
    }
  }

  handleDelete = id => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);
      newAlunos.splice(index, 1);

      this.handleSave(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newAlunos = prevState.alunos.slice();
      const index = newAlunos.findIndex(aluno => aluno.id === id);
      newAlunos[index].nome = text;

      this.handleSave(newAlunos);

      return {
        alunos: newAlunos
      };
    });
  };

  handleReload = () => {
    this.setState({ isLoading: true });
    AlunoService.load()
      .then(alunos => {
        this.setState({ alunos, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  handleAddAluno = text => {
    this.setState(prevState => {
      const maxAluno = prevState.alunos.reduce((prev, current) =>
        Number(prev.id) > Number(current.id) ? prev : current
      );
      const { id } = maxAluno;
      console.log('maxAluno', maxAluno, 'id', id);
      const alunos = prevState.alunos.concat({ id: id + 1, nome: text, turmaId: -1 });
      this.handleSave(alunos);
      return { alunos };
    });
  };

  handleSave = alunos => {
    AlunoService.save(alunos)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveHasError: true });
      });
  };

  render() {
    const { alunos } = this.state;
    return (
      <div className="alunos">
        <NewAluno onAddAluno={this.handleAddAluno} />
        <ListAlunos alunos={alunos} onDelete={this.handleDelete} onEdit={this.handleEdit} />
        <ToastContainer />
      </div>
    );
  }
}

export default Alunos;
