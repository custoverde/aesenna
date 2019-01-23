class AlunoService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringAlunos = window.localStorage.getItem('alunos');
      if (!stringAlunos) {
        fetch('http://jsonplaceholder.typicode.com/todos')
          .then(todos => {
            const alunos = [];
            todos.map(todo => {
              alunos.concat({ turmaId: todo.userId, id: todo.id, nome: todo.title });
            });
            resolve(alunos);
          })
          .catch(err => reject(err));
      } else {
        resolve(JSON.parse(stringAlunos));
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
}

export default AlunoService;
