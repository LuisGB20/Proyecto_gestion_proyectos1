
import rectangulo from '../../../IMG/Rectangle413481.png'

function Mensaje() {
    return (
        <div className='border-2 w-11/12 mx-auto rounded-lg flex my-3'>
            <img src={rectangulo} className='w-1/6 h-28 m-auto' />
            <p className='text-center text-md w-1/6 mx-auto font-semibold italic my-auto'>Luis Gomez:</p>
            <p className='text-center text-md w-4/6 mx-auto font-semibold italic my-auto'>Buenos dias a todos</p>
        </div>
    )
}

export default Mensaje