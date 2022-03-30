import "./App.scss";
import WalletContainer from "./components/WalletContainer";
import MintPage from "./pages/MintPage";
import ListPage from "./pages/ListPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Buffer } from "buffer";
window.Buffer = Buffer;

function App() {
  return (
    <div className="App">
      <WalletContainer>
        <Router>
          <Switch>
            <Route exact path="/list" component={ListPage} />
            <Route path="/" component={MintPage} />
          </Switch>
        </Router>
      </WalletContainer>
    </div>
  );
}

export default App;
