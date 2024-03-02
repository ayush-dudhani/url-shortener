import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const handleButtonClick = async () => {
    try{
      const postData = {
        url : url,
      };
      const response = await axios.post('http://localhost:8001/url', postData); 
      alert(`http://localhost:8001/url/${response.data.id}`);
    } catch (error){
      console.error('Error making POST request:', error);
    }
    
  }
  
  const handleAnalytics = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/url/analytics/${id}`);
    alert(`Number Of Visits : ${response.data.numberOfClicks}`);
    } catch(error) {
      console.error('Error making POST request:', error);
    }
    
  }
  return (
    <div className="App">
      <header className="App-header">
        <input value={url} onChange={(e) => setUrl(e.target.value)}/>
        <button onClick={handleButtonClick}>Generate Shorten URL</button>
      </header>

      <header className="Analytics">
        <input value={id} onChange={(e) => setId(e.target.value)}/>
        <button onClick={handleAnalytics}>Get Analytics</button>
      </header>
    </div>
  );
}

export default App
