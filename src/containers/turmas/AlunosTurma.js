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

  componentDidMount(){
    this.handleReloadTurma();
    this.handleReloadAlunos();
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
    TurmaService.byId(this.props.match.id)
      .then(turma => {
        this.setState({ turma, isLoading: false });
      })
      .catch(() => {
        this.setState({ isLoading: false, reloadHasError: true });
      });
  };

  handleReloadAlunos = () =>{
    console.log('tentativa ', this.props.match.id);
    
    AlunoService.byTurmaId(this.props.match.id)
    .then(alunosTurma => {
      this.setState({ alunosTurma, isAlunosLoading: false });
    })
    .catch(() => {
      this.setState({ isAlunosLoading: false, reloadHasError: true });
    });
  }

  handleDelete = () => {

  };

  handleEdit = () => {

  };

  render() {
    const {turma, alunosTurma} = this.state;

    return (
      <div className="alunos-turma">
        <ViewTurma turma={turma} />
        
        <ToastContainer />
      </div>

    );
  }
}

export default AlunosTurma;
