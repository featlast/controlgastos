import {useEffect, useState} from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto,setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado

        //Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos]);


    const formatearPrespuesto = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado=confirm('Desea Reiniciar presupuesto y gastos?')
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className={"contenedor-presupuesto contenedor sombra dos-columnas"}>
            <div>
                <CircularProgressbarWithChildren
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        strokeLinecap: 'butt',
                        trailColor: '#F5F5F5',
                        pathTransitionDuration: .5
                    })}
                    value={porcentaje}
                    text={`${porcentaje}%`}
                />
            </div>
            <div className={"contenido-presupuesto"}>
                <button
                    className={'reset-app'}
                    type={"button"}
                    onClick={handleResetApp}
                >Resetear Presupuesto
                </button>
                <p><span>Presupuesto: </span>{formatearPrespuesto(presupuesto)}</p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearPrespuesto(disponible)}</p>
                <p><span>Gastado: </span>{formatearPrespuesto(gastado)}</p>

            </div>

        </div>
    );
};

export default ControlPresupuesto;
