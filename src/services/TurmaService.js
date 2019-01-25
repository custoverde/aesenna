class TurmaService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringTurmas = window.localStorage.getItem('turmas');
      if (stringTurmas) {
        resolve(JSON.parse(stringTurmas));
      } else {
        fetch('http://jsonplaceholder.typicode.com/users')
          .then(res => {
            res.json().then(users => {
              let turmas = [];
              users.map(user => {
                const {id, name } = user;
                turmas = turmas.concat({ id, nome:name});
              });
              resolve(turmas);
            });
          })
          .catch(err => reject(err));
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
