import { useState } from "react"

const EditarModal = (props) => {

    const [name, setName] = useState(props.nombreEdit)
    const [description, setDescription] = useState(props.descEdit)

    const cambiarNombre = (evt) => {
        setName(evt.target.value)
    }

    const cambiarDescripcion = (evt) => {
        setDescription(evt.target.value)
    }

    const cerrarModal = () => {
        setName("")
        setDescription("")
        props.onClose()
    }

    if (props.show){
        return <div className="modal fade show d-block ventanaModal" tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" >
                            Edit Task
                        </h1>
                        <button type="button" 
                            className="btn-close btn-close-white"
                            onClick={ () => {
                                cerrarModal()
                            } }>

                        </button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label className="form-label">Name: </label>
                            <input type="text" className="form-control" value={name} onChange={cambiarNombre} placeholder="(ex. Play soccer)"/>
                        </div>
                        <div>
                            <label className="form-label">Description: </label>
                            <textarea className="form-control" value={description} onChange={cambiarDescripcion} placeholder="Some description..."/>
                        </div>
                        <div>
                            {props.error !== ""?<p className="text-danger h5 mt-3">{props.error}</p>:<></>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={ () => {
                                cerrarModal()
                            } }>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => {props.onCreate(name, description)}}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    }else {
        <></>
    }
}

export default EditarModal