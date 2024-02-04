import React from "react";

function Rol(props) {
    const { rol } = props;

    return (
        <div className="bg-white h-20 w-full flex justify-start items-center mt-5">
            <h1 className="text-2xl font-semibold italic p-5">ROL: {rol === 2 ? "Diseñador" : rol === 3 ? "Programador" : "Analista"}</h1>
        </div>
    )
}
export default Rol