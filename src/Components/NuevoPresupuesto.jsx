import {useState} from 'react';
import Alert from "./Alert";

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {
    const [mensaje, setMensaje] = useState("");

    const handlePresupuesto=(e)=>{
        e.preventDefault()
        if(!presupuesto || presupuesto<0){
            setMensaje("No es Un Presupuesto Válido")
            return
        }
        setMensaje("")
        setIsValidPresupuesto(true)


    }
    return (
        <div className={"contenedor-presupuesto contenedor sombra"}>
            <form onSubmit={handlePresupuesto} className={'formulario'}>
                <div className={"campo"}>
                    <label>Definir Presupuesto</label>
                    <input
                        className={"nuevo-presupuesto"}
                        type={"number"}
                        placeholder={"Agrega tu Presupuesto"}
                        value={presupuesto}
                        onChange={(e)=>setPresupuesto(Number(e.target.value))}
                    />

                </div>
                <input type={"submit"} value={"Añadir"}/>
                {mensaje && <Alert tipo={"error"}>{mensaje}</Alert>}
            </form>
        </div>

    );
};

export default NuevoPresupuesto;
