import React from 'react';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListTurmas from '../components/ListTurmas';
import TurmaService from '../services/TurmaService';

class Turmas extends React.Component {
  state = {
    isLoading: true,
    reloadHasError: false,
    turmas: []
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
    TurmaService.load()
      .then(turmas => {
        this.setState({ turmas, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  render() {
    const {turmas} = this.state;
    return (
        <div className="turmas">
            <ListTurmas turmas={turmas} onDelete={this.handleDelete} onEdit={this.handleEdit} />
            <ToastContainer />
        </div>
      )
  }
}

export default Turmas;
