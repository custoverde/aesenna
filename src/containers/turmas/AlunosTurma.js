import React from 'react';

import ViewTurma from '../../components/turmas/ViewTurma';
import ListAlunosTurma from '../../components/turmas/ListAlunosTurma';

import TurmaService from '../../services/TurmaService.js';
import AlunoService from '../../services/AlunoService.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AlunosTurma extends React.Component {
  state = {
    isTurmaLoading: false,
    isAlunosLoading: false,
    reloadHasError: false,
    turma: {},
    alunosTurma: []
  };

  componentDidMount() {
    this.handleReloadAlunos();
    this.handleReloadTurma();
  }

  componentDidUpdate() {
    const { isAlunosLoading: isAlunosLoading } = this.state;
    if (isAlunosLoading) {
      toast('Carregando');
    } else {
      toast.dismiss();
    }
  }

  handleReloadTurma = () => {
    const id = this.props.match.params.id;
    TurmaService.byId(id)
      .then(turma => {
        this.setState({ turma, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  handleReloadAlunos = () => {
    AlunoService.byTurmaId(this.props.match.params.id)
      .then(alunosTurma => {
        this.setState({ alunosTurma, isAlunosLoading: false });
      })
      .catch(() => {
        this.setState({ isAlunosLoading: false, reloadHasError: true });
      });
  };

  handlePorNaTurma = p_id => {
    const turmaId = this.props.match.params.id;
    AlunoService.saveById(p_id, turmaId)
      .then(ok => {
        if (ok) {
          this.handleReloadAlunos();
        }
      })
      .catch(() => {
        this.setState({ isAlunosLoading: false, reloadHasError: true });
      });
  };

  handleTirarDaTurma = p_id => {
    AlunoService.saveById(p_id, -1)
      .then(ok => {
        if (ok) {
          this.handleReloadAlunos();
        }
      })
      .catch(() => {
        this.setState({ isAlunosLoading: false, reloadHasError: true });
      });
  };

  render() {
    const { turma, alunosTurma } = this.state;

    return (
      <div className="alunos-turma">
        <ViewTurma turma={turma} />

        <ListAlunosTurma
          alunos={alunosTurma}
          onPorNaTurma={this.handlePorNaTurma}
          onTirarDaTurma={this.handleTirarDaTurma}
        />
        <ToastContainer />
      </div>
    );
  }
}

export default AlunosTurma;
