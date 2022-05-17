import {useState, useEffect} from 'react'
import './App.css'
import Header from "./Components/Header";
import IconoNuevoGasto from './img/icono_salud.svg'
import Modal from "./Components/Modal";
import {generarId} from "./helpers";
import ListadoGastos from "./Components/ListadoGastos";
import Filtros from "./Components/Filtros";

function App() {
    const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true)
            setTimeout(() => {
                setAnimarModal(true)
            }, 500)
        }
    }, [gastoEditar]);
    /**
     * UseEffect para almacenar presupuesto en el localStorage
     */
    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto]);

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true)
        }
    }, []);

    /**
     * useEffect para almacenar los gastos en el local storage
     */

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos]);

    /**
     * Use effect para filtrar cuando sea llamado gastos
     */

    useEffect(() => {
        if(filtro){
            const gastosFiltrados=gastos.filter(gasto=>gasto.categoria===filtro)
            setGastosFiltrados(gastosFiltrados)
        }
    }, [filtro]);


    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})
        setTimeout(() => {
            setAnimarModal(true)
        }, 500)

    }

    /**
     * Funcion para guardas gasto
     * @param gasto
     */
    const guardarGasto = (gasto) => {
        if (gasto.id) {
            //Actualizar
            const gastosActualizdos = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizdos)
            setGastoEditar({})
        } else {
            //nuevo Gasto
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
        }, 500)
    }
    /**
     * Funcion para Eliminar Gasto
     * @param id
     */
    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
        setGastos(gastosActualizados)
    }
    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                gastos={gastos}
                setGastos={setGastos}
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}

            />
            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtros
                        filtro={filtro}
                        setFiltro={setFiltro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastrosFiltrados={gastosFiltrados}
                        />
                    </main>
                    <div className={"nuevo-gasto"}>
                        <img
                            src={IconoNuevoGasto}
                            alt={"Icono Nuevo Gasto"}
                            onClick={handleNuevoGasto}
                        />
                    </div>
                </>
            )}
            {
                modal && <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            }

        </div>
    )
}

export default App
