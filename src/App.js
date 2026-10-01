import { ToastContainer } from 'react-toastify';
import PortfolioContainer from './PortfolioContainer/PortfolioContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <PortfolioContainer />
    </div>
  );
}

export default App;
