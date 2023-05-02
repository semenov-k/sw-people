import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>hello</ChakraProvider>
    </Provider>
  );
};

export default App;
