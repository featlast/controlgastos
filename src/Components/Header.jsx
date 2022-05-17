import React from 'react';
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({gastos,presupuesto, setPresupuesto, setIsValidPresupuesto, isValidPresupuesto,setGastos}) => {
    return (
        <header>
            <h1>Planificador Gastos</h1>
            {isValidPresupuesto
                ? (<ControlPresupuesto
                    presupuesto={presupuesto}
                    gastos={gastos}
                    setPresupuesto={setPresupuesto}
                    setGastos={setGastos}
                    setIsValidPresupuesto={setIsValidPresupuesto}
                />)
                : (
                    <NuevoPresupuesto
                        presupuesto={presupuesto}
                        setPresupuesto={setPresupuesto}
                        setIsValidPresupuesto={setIsValidPresupuesto}
                    />
                )
            }

        </header>
    );
};

export default Header;
