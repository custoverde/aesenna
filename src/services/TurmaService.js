class TurmaService {
  static load() {
    return new Promise((resolve, reject) => {
      const stringTurmas = window.localStorage.getItem('turmas');
      if (!stringTurmas) {
        fetch('http://jsonplaceholder.typicode.com/users')
          .then(users => {
            const turmas = [];
            users.map(user => {
              turmas.concat({ id: user.id, nome: user.mame });
            });
            resolve(turmas);
          })
          .catch(err => reject(err));
      } else {
        resolve(JSON.parse(stringTurmas));
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
