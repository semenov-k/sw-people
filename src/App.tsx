import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux';
import { PeopleDetailPage, PeopleListPage } from './features/people';
import { Page404 } from './features/shared';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/people/:personId" exact>
              <PeopleDetailPage />
            </Route>
            <Route path="/" exact>
              <PeopleListPage />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
