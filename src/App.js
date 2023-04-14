import logo from './logo.svg';
import './App.css';
import Container from './components/Container';
import { WeatherProvider } from './context/WeatherContext';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  return (
  <WeatherProvider>
    <Container />
  </WeatherProvider>
  );
}

export default App;
