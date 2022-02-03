import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <HomePage />
    </Router>
  );
};

export default App;
