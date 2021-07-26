import React from 'react';
import './App.css';
import Fragment from './components/Fragment'
class App extends React.Component {
  constructor(props:any) {
    super(props);
}
  render(){
  return (
    <div>
    {/* <Tools/> */}
    <Fragment/>
    </div>
  );}
}

export default App;
