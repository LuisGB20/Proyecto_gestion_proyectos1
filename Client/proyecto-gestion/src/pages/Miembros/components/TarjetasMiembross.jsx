import netflix from '../../../IMG/netflix.png'

    function TarjetasMiembross() {
    return (
        <>
        <div className='border-2 w-11/12 mx-auto rounded-lg flex my-3'>
        <img src={netflix} className='w-1/4 h-28 m-auto'/>
        <p className='text-center text-md w-1/4 mx-auto font-semibold italic my-auto'>Netflix</p>
        <div className='w-1/4 my-auto mx-auto'>
            <div className='w-full bg-blue-500 h-2 rounded-full mx-auto'><h1> </h1></div>
            <h2 className='text-center text-md mx-auto font-semibold italic my-auto'>Disponibilidad</h2>
        </div>
    </div>
        </>
    )
    }

    export default TarjetasMiembross
