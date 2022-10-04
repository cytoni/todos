import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //Listen Daten von der REST Api holen
    axios.get("http://localhost:3000/todos").
    then((response) => setTodos(response.data));
  }, []);

  //Eine Liste mit React machen
  const todoListe = todos.map((item) => <li key={item.id}>{item.todo}</li>)
  return (
  <div className="App">
    <h1>Meine ToDo Liste</h1>
  <ul>{todoListe}</ul>
  </div>);
}

export default App;
