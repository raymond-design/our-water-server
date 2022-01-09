import './App.css';
import Slider from './Components/Slider/Slider'
import FadeIn from 'react-fade-in'

function App() {
  return (
    <div class="full">
      <FadeIn transitionDuration="600" delay="250">
        <h1 class="title">Water Map Viewer</h1>
        <h2 class="title2">Real-Time Data in the U.S.</h2>
        <Slider/>
      </FadeIn>
    </div>
  );
}

export default App;