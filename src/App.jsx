import React, {
  Component
} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main.jsx';
import GMap from './GMap.jsx'
class App extends Component {
  state = {
    dataFromServer: {},
    count: 1
  }

  updateBinData = (data) => {
   
    this.setState({ dataFromServer: data.incomingData })
    console.log(this.state.dataFromServer ,"dataFromServer")
    // this.setState({ count: this.state.count + 1 })
    // console.log(this.state.dataFromServer)
  }

  render() {
    return (
      <div >
        <Main updationOfData={this.updateBinData} />
        <h1> lora test file react</h1>
        <h1>updated app {this.state.count}</h1>
        <GMap dataToBePlotted={this.state.dataFromServer}  />
      </div>
    )
  }
}
export default App;
