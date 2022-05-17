import React, {useState, useEffect} from 'react';
import CerrarBtn from '../img/cerrar.svg'
import Alert from "./Alert";

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar,setGastoEditar}) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, []);
    


    const ocultarModal = () => {
        //setModal(false)
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500)
    }

    const handleSubmit = event => {
        event.preventDefault()
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos Los Campos Son Obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 1500)
            return
        }
        guardarGasto({nombre, cantidad, categoria,id,fecha})
    }
    return (
        <div className={"modal"}>
            <div className={"cerrar-modal"}>
                <img
                    src={CerrarBtn}
                    alt={"Cerrar Modal"}
                    onClick={ocultarModal}
                />
            </div>
            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEditar.nombre ? "Actualizar Gasto" : "Nuevo Gasto"}</legend>
                {mensaje && <Alert tipo={'error'}>{mensaje}</Alert>}
                <div className={"campo"}>
                    <label htmlFor={"nombre"}>Nombre Gasto</label>
                    <input
                        id={"nombre"}
                        type={"text"}
                        placeholder={"Añade El Nombre Del Gasto"}
                        value={nombre}
                        onChange={event => setNombre(event.target.value)}
                    />
                </div>
                <div className={"campo"}>
                    <label htmlFor={"cantidad"}>Cantidad</label>
                    <input
                        id={"cantidad"}
                        type={"number"}
                        placeholder={"Añade La Cantidad Del Gasto"}
                        value={cantidad}
                        onChange={event => setCantidad(Number(event.target.value))}
                    />
                </div>
                <div className={"campo"}>
                    <label htmlFor={"cateogira"}>Categoría</label>
                    <select id={"categoria"} value={categoria} onChange={event => setCategoria(event.target.value)}>
                        <option value={""}>-- Seleccione --</option>
                        <option value={"Ahorro"}>Ahorro</option>
                        <option value={"Comida"}>Comida</option>
                        <option value={"Ocio"}>Ocio</option>
                        <option value={"salud"}>Salud</option>
                        <option value={"gastos"}>Gastos Varios</option>
                        <option value={"Suscripciones"}>Suscripciones</option>

                    </select>

                </div>
                <input
                    type={"submit"}
                    value={gastoEditar.nombre ? "Actualizar Gasto" : "Añadir Gasto"}
                />
            </form>
        </div>
    );
};

export default Modal;
