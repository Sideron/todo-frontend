import EditarModal from "./EditarModal"

const Task = (props) => {

  const getThisTask = async () => {

  }

    return <div className='bg-dark pb-2 p-4 rounded row mb-3'>
    <div className='col-9'>
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
    </div>
    <div className='col-3'>
      <button type="button" className='btn btn-success btn-lg m-2'>Edit</button>
      <button type="button" className='btn btn-danger btn-lg' onClick={props.delete}>Delete</button>
      <EditarModal/>
    </div>
  </div>
}

export default Task