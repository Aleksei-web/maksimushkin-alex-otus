import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bye from "./pages/bye/Bye";
import ErrorPage from "./pages/error/ErrorPage";
import Quiz from "./pages/quiz/Quiz";
function App() {

  return (
    <div className="container">
    <Router>
      <Switch>
        <Route exact path="/quiz/:url" component={Quiz} />
        <Route exact path="/error" component={ErrorPage} />
        <Route exact path="/bye" component={Bye} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
