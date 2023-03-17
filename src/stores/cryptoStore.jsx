import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from '../reducers/crypto/cryptoReducer';

const cryptoStore = (props) =>(
  configureStore({
    reducer: cryptoReducer,
    preloadedState: props
  })
);

export default cryptoStore;
