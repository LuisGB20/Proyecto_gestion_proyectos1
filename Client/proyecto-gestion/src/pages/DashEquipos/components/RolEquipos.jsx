import React from "react";

function Rol(props) {
    const { rol } = props;


    return (
        <div className="bg-white h-20 w-[100%] flex justify-start items-center mt-5">
            <h1 className="ml-10 font-bold text-xl">ROL: {rol === 2 ? "Diseñador" : rol === 3 ? "Programador" : "Analista"}</h1>
        </div>
    )
}
export default Rol