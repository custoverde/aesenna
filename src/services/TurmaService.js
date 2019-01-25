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
                const {id, name } = user;
                turmas = turmas.concat({ id, nome:name});
              });
              TurmaService.save(turmas);
              resolve(turmas);
            });
          })
          .catch(err => reject(err));
      }
    });
  }

  static byId(id) {
     console.log(id);

     TurmaService.load().then(turmas => {
      console.log(turmas);
      const index = turmas.findIndex(turma => turma.id === id);
      return turmas[index];
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
