import React from 'react';
import Navigator from './src/Screens/Navigator';
import {Provider as ReduxProvider} from 'react-redux';
import { makeStore } from './src/store/store';

 const App = () => {
  const store = makeStore();
   return (
    <ReduxProvider store ={store}>
      <Navigator />
    </ReduxProvider>
   );
 }
 export default App;