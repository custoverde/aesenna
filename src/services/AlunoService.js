class AlunoService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringAlunos = window.localStorage.getItem("alunos");
      if (stringAlunos) {
        resolve(JSON.parse(stringAlunos));
      } else {
        fetch(
          "https://cors-anywhere.herokuapp.com/http://jsonplaceholder.typicode.com/todos"
        )
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

  static byTurmaId(id) {
    return new Promise((resolve, reject) => {
      try {
        AlunoService.load().then(alunos => {
          const alunosTurma = alunos.filter(aluno => {
            aluno.turmaId === id;
          });
          console.log('alunos: ', alunosTurma);
          resolve(alunosTurma);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static save(alunos) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem("alunos", JSON.stringify(alunos));
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default AlunoService;
