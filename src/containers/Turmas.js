import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListTurmas from '../components/ListTurmas';
import TurmaService from '../services/TurmaService';
import AlunoService from '../services/AlunoService';

class Turmas extends React.Component {
  state = {
    isLoading: true,
    reloadHasError: false,
    saveHasError: false,
    turmas: [],
    dic: {}
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
    AlunoService.dealocateOfTurmaId(id).then(ok => {
      if (ok) {
        this.setState(prevState => {
          const newTurmas = prevState.turmas.slice();
          const index = newTurmas.findIndex(turma => turma.id === id);
          newTurmas.splice(index, 1);

          this.handleSave(newTurmas);

          return {
            turmas: newTurmas
          };
        });
      }
    });
  };

  handleEdit = (id, text) => {
    this.setState(prevState => {
      const newTurmas = prevState.turmas.slice();
      const index = newTurmas.findIndex(turma => turma.id === id);
      newTurmas[index].nome = text;
      this.handleSave(newTurmas);

      return {
        turmas: newTurmas
      };
    });
  };

  handleSave = turmas => {
    TurmaService.save(turmas)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, saveHasError: true });
      });
  };

  handleReload = () => {
    TurmaService.load()
      .then(turmas => {
        AlunoService.AlunosPorTurma().then(dic => {
          this.setState({ turmas, dic, isLoading: false });
        });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  render() {
    const { turmas, dic } = this.state;

    return (
      <div className="turmas">
        <ListTurmas turmas={turmas} dic={dic} onDelete={this.handleDelete} onEdit={this.handleEdit} />
        <ToastContainer />
      </div>
    );
  }
}

export default Turmas;
