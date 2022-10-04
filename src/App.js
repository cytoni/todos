import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';

function App() {
  //useState
  const [todos, setTodos] = useState([]);
  const [aufgabe, setAufgabe] = useState("");

  useEffect(() => {
    //Listen Daten von der REST Api holen
    axios.get("http://localhost:3004/todos").then((response) => setTodos(response.data));
  }, [aufgabe]);

  //Eine Liste mit React machen
  const todoListe = todos.map((item) => <li key={item.id}>{item.todo} <button id={item.id} onClick={handleDelete}>Löschen</button></li>);
  
  function handleDelete(event) {
    const id = event.target.id;
    axios.delete(`localhost:3004/todos/${event.target.id}`)
  }

  //EventHandler Funktion für das Submit Event
  function handleSubmit(event){
    event.preventDefault();
    //In die Datenbank schreiben 
    axios.post("http://localhost:3004/todos", { todo: aufgabe })
    .then((response) => {setAufgabe("")});
  }
  return (
  <div className="App">
    <h1>Meine ToDo Liste</h1>
    <form onSubmit={handleSubmit}>
      {/* Value muss einer Variable entsprechen */}
      <input required={true} type="text" name="aufgabe" value={aufgabe} onChange={(event) => setAufgabe(event.target.value)} />
      <button type="submit">Senden</button>
    </form>
  <ul>{todoListe}</ul>
  </div>);
}

export default App;
