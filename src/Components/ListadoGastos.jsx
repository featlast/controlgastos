import React from 'react';
import Gasto from "./Gasto";

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastrosFiltrados, filtro}) => {
    return (
        <div className={"listado-gastos contenedor"}>
            {filtro ? (
                <>
                    <h2>{gastrosFiltrados.length ? "Gastos" : "No Hay Gatos En Esta Categoría"}</h2>
                    {gastrosFiltrados.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{gastos.length ? "Gastos" : "No Hay Gatos Aún"}</h2>
                    {gastos.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default ListadoGastos;
