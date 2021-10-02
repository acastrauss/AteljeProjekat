import './App.css';
import { ContentTable } from './ContentTable';
import { LogIn } from './LogIn';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LogIn/>
        <br/>
        <div className="tableDiv">
          <ContentTable></ContentTable>
        </div>
      </header>
    </div>
  );
}

export default App;
