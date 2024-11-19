import './App.css';
import Header from './components/Header';
import Invoice from './components/Invoice';

function App() {
  return (
    <div className="App">
      <Header/>

      <div className='page-info'>
        <h1>Invoice Generator.</h1>
        <p>Create an invoice online with our free invoice maker in moments.</p>
      </div>
      
      <Invoice/>
    </div>
  );
}

export default App;
