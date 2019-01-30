import React from 'react';

class NewAluno extends React.Component {
  state = {
    text: ''
  };

  render() {
    const { onAddAluno } = this.props;
    const { text } = this.state;

    return (
      <div className="new-item">
        <input
          type="text"
          className="new-item__input"
          placeholder="Digite o novo aluno aqui..."
          value={text}
          onChange={event => {
            this.setState({
              text: event.target.value
            });
          }}
          onKeyPress={event => {
            console.log('chegou');
            if (event.key === 'Enter') {
              console.log('chegou 2');
              onAddAluno(event.target.value);
              this.setState({
                text: ''
              });
            }
          }}
        />
      </div>
    );
  }
}

export default NewAluno;
