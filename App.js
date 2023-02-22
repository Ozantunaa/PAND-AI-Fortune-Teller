import { StatusBar } from 'react-native';
import { CountProvider } from './src/context/CountContext';
import Router from './src/navigation/Router';

export default function App() {

  return (
    
    <CountProvider>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Router />
    </CountProvider>


  );
}