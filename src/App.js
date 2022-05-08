import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Header from './Components/RdComponents/Header';
import { DisplayData } from './Components/RdComponents/DisplayData';
import TransactionData from './Components/RdComponents/TransactionData';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';


// import store from './ReduxToolkit/Store';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <h1>WELCOME TO MY TOKENS SITE</h1>
         
          <Link to="/">Home </Link><span> =>  </span>
          <Link to="/DisplayData">Display Data </Link> <span> =>  </span>
          <Link to="/TransactionData">Transaction Data </Link>
          <br/>
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/DisplayData' element={<DisplayData />} />
            <Route path='/TransactionData' element={<TransactionData />} />
          </Routes>


          {/* <DisplayData />
          <TransactionData /> */}
        </div>
      </Provider>
    </BrowserRouter>

  );
}

export default App;


// use this component for handling contract without redux or redux-toolkit
// import ConnectWallat from './Components/ConectWallet.js';
// <ConnectWallat/>
