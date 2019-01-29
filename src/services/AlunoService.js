class AlunoService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringAlunos = window.localStorage.getItem('alunos');
      if (stringAlunos) {
        resolve(JSON.parse(stringAlunos));
      } else {
        fetch('https://cors-anywhere.herokuapp.com/http://jsonplaceholder.typicode.com/todos')
          .then(res => {
            res.json().then(todos => {
              let alunos = [];
              todos.map(todo => {
                const { userId, id, title } = todo;
                alunos = alunos.concat({
                  turmaId: userId,
                  id: id,
                  nome: title
                });
              });
              setTimeout(() => {
                AlunoService.save(alunos);
                resolve(alunos);
              }, 2000);
            });
          })
          .catch(err => reject(err));
      }
    });
  }

  static byTurmaId(p_id) {
    return new Promise((resolve, reject) => {
      try {
        AlunoService.load().then(alunos => {
          let alunosTurma = alunos.filter(aluno => {
            let { turmaId } = aluno;
            return Number(turmaId) === Number(p_id) || Number(turmaId) === Number(-1);
          });

          resolve(alunosTurma);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static dealocateOfTurmaId(p_id) {
    return new Promise((resolve, reject) => {
      try {
        AlunoService.load().then(alunos => {
          alunos.map(aluno => {
            let { turmaId } = aluno;
            if (Number(turmaId) === Number(p_id)) {
              aluno.turmaId = -1;
            }
          });

          AlunoService.save(alunos);

          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static save(alunos) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem('alunos', JSON.stringify(alunos));
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  static saveById(p_id, p_turmaId) {
    return new Promise((resolve, reject) => {
      try {
        AlunoService.load().then(alunos => {
          alunos.map(aluno => {
            let { id } = aluno;
            if (Number(id) === Number(p_id)) {
              aluno.turmaId = p_turmaId;
            }
          });

          AlunoService.save(alunos);

          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static AlunosPorTurma() {
    return new Promise((resolve, reject) => {
      try {
        AlunoService.load().then(alunos => {
          let dic = new Map();

          alunos.map(aluno => {
            let cont = 0;
            if (aluno.turmaId >= 0) {
              if (dic.has(Number(aluno.turmaId))) {
                cont = dic.get(Number(aluno.turmaId));
              }
              cont++;
              dic.set(Number(aluno.turmaId), cont);
            }
          });

          resolve(dic);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AlunoService;
