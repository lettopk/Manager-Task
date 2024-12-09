import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//definicion de constantes
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  //Busqueda y muestra de tareas
  const fetchTasks = async () => {
	try {
		//consulta de base de datos
	    const response = await axios.get('http://localhost:8080/tasks');
	    console.log(response.data);  // Verificar la respuesta
	    setTasks(response.data);
	  } catch (error) {
	    console.error("Error fetching tasks:", error);
	  }
  };

  //Creacion de tareas nuevas
  const handleCreateTask = async (e) => {
    e.preventDefault();
	//verificacion de espacios llenos
    if (!newTask.title || !newTask.description) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
	//POST de tareas nuevas
    const response = await axios.post('http://localhost:8080/tasks', newTask);
    setTasks([...tasks, response.data]);
    setNewTask({ title: '', description: '' });
  };

  
  //Eliminacion de tareas
  const handleDeleteTask = async (id) => {

    try {
		//DELETE de tareas
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError('Error al eliminar la tarea');
    }
  };

  return (
    <div>
      <h1>Gestión de tareas</h1>
	  
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Título"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button type="submit">Agregar Tarea</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
	  {tasks.map((task) => (
	    <li key={task.id}>  {/* Verificar que task.id sea único */}
	      <h3>{task.title}</h3>
	      <p>{task.description}</p>
	      <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
	    </li>
	  	))}    
      </ul>
    </div>
  );
};

export default App;
