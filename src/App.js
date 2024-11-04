import { useEffect, useState } from 'react';
import './App.css';
import Task from './components/Task';
import RegistroModal from './components/RegistroModal';

const App = () => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState("")
  const [modalShown, setModalShown] = useState(false)

  const httpGetTasks = async () => {
    const resp = await fetch ("http://localhost:3001/tasks")
    const tareas = await resp.json()
    setTasks(tareas)
  }

  const deleteTask = async (id) => {
    const resp = await fetch("http://localhost:3001/tasks/"+id, {
        method: "DELETE"})
    const dataResp = await resp.json()

    if (dataResp.error === "")
    {
        setError("")
    }else
    {
        setError(dataResp.error)
    }

    httpGetTasks()
  }

  const createTask = async (name, desc) => {
    const data = {
      nombre : name,
      descripcion : desc
    }
    const resp = await fetch("http://localhost:3001/tasks", {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            "Content-Type" : "application/json"
        }
    })
    const dataResp = await resp.json()

    if (dataResp.error === "")
    {
        setError("")
        setModalShown(false)
        httpGetTasks()
    }else
    {
        setError(dataResp.error)
    }
    
  }

  useEffect(() => {
    setError("")
    httpGetTasks()
  },[])

  document.body.style.backgroundColor = "rgb(45, 50, 65)"
  document.body.style.color = "white";
  return <>
    <div className='bg-primary bg-gradient text-center p-2'>
      <h1 className='text-light display-4'>To-Do List</h1>
    </div>
    <div className='container'>
      <div className='row mt-4'>
        <div className='col-8'>
          {tasks.map((x) => { return <Task id={x.id} name={x.nombre} desc={x.descripcion} delete={() => {
            deleteTask(x.id)
          }}/>})}
        </div>
        <div className='col-4'>
          <div className='bg-dark rounded container p-3'>
            <h2>Options</h2>
            <button type="button" className="btn btn-primary btn-lg botonFull" onClick={() => {setModalShown(true)}}>Add Task</button>
          </div>
        </div>
      </div>
    <RegistroModal show={modalShown} onClose={ () => {
                setModalShown(false)
            }} onCreate={(name, desc) => {createTask(name,desc)}} error={error} />
    </div>
  </>
}

export default App;
