import './App.css';
import Crypto from './containers/crypto';
import { Route } from 'react-router-dom';

function App() {
  return (
    <Route path='/crypto' component={
      () => <Crypto />}
    />
  );
}

export default App;
