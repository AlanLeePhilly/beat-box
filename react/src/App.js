import React from 'react';
// import ComponentToRender from './RelativePath'
// import DataToUse from './RelativePath'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieceOfState: null,
      anotherPiece: []
    }
    this.someFunction = this.someFunction.bind(this)
  }

  someFunction(arg) {
    if (true){
      this.setState({
        pieceOfState: arg
      })
    } else {
      this.setState({
        selectedId: null
      })
    }
  }

  render() {

    return(
      <div>
        Bum Bum Buuuum
      </div>
    )
  }
}

export default App;
