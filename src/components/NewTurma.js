import React from 'react';

class NewTurma extends React.Component {
  state = {
    text: ''
  };

  render() {
    const { onAddTurma } = this.props;
    const { text } = this.state;

    return (
      <div className="new-item">
        <input
          type="text"
          className="new-item__input"
          placeholder="Digitea nova turma aqui..."
          value={text}
          onChange={event => {
            this.setState({
              text: event.target.value
            });
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              onAddTurma(event.target.value);
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

export default NewTurma;
