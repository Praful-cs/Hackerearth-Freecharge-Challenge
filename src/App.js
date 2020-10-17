import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Payment from './components/Payment';
import Recipes from './components/Recipes';

class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Recipes} />
        <Route path="/payment" exact component={Payment} />
        <Redirect to="/" />
      </Switch>
    );
    return(
      <div>
        {routes}
      </div>
    )
  }
}

export default App;
