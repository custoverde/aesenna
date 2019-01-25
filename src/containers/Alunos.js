import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AlunoService from '../services/AlunoService';
import ListAlunos from '../components/ListAlunos';

class Alunos extends React.Component {
  state = {
    isLoading: false,
    reloadHasError: false,
    alunos: []
  };

  componentDidMount() {
    this.setState({isLoading:true});
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
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes.splice(index, 1);

      this.handleSave(newNotes);

      return {
        notes: newNotes
      };
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newNotes = prevState.notes.slice();
      const index = newNotes.findIndex(note => note.id === id);
      newNotes[index].text = text;

      this.handleSave(newNotes);

      return {
        notes: newNotes
      };
    });
  };

  handleReload = () => {
    AlunoService.load()
      .then(alunos => {
        this.setState({ alunos, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  render() {
    const { alunos } = this.state;
    return (
      <div className="alunos">
        <ListAlunos alunos={alunos} onDelete={this.handleDelete} onEdit={this.handleEdit} />
        <ToastContainer />
      </div>
    );
  }
}

export default Alunos;
