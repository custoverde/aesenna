class TurmaService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringTurmas = window.localStorage.getItem('turmas');
      if (stringTurmas) {
        resolve(JSON.parse(stringTurmas));
      } else {
        fetch('https://cors-anywhere.herokuapp.com/http://jsonplaceholder.typicode.com/users')
          .then(res => {
            res.json().then(users => {
              let turmas = [];
              users.map(user => {
                const { id, name } = user;
                turmas = turmas.concat({ id, nome: name });
              });
              TurmaService.save(turmas);
              resolve(turmas);
            });
          })
          .catch(err => reject(err));
      }
    });
  }

  static byId(p_id) {
    return new Promise((resolve, reject) => {
      try {
        TurmaService.load().then(turmas => {
          const turma = turmas.find(turma => {
            const { id } = turma;
            return Number(id) === Number(p_id);
          });
          resolve(turma);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static save(turmas) {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem('turmas', JSON.stringify(turmas));
        resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TurmaService;
