import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Modal from 'react-modal';
import TarjetaRecurso from './components/TarjetaRecurso';
import Swal from 'sweetalert2';

function RecursosActivosAdmin() {
  const [recursosActivos, setRecursosActivos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recursoActivoSeleccionado, setRecursoActivoSeleccionado] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    nombre: "",
    descripcion: "",
    disponibilidad: "Disponible",
    tipo: "Activo",
    categoria: null
  })

  // Función para abrir el modal de agregar nuevo recurso
  const mostrarModalAgregar = () => {
    setModalAgregarVisible(true);
  };

  // Función para cerrar el modal de agregar nuevo recurso
  const cerrarModalAgregar = () => {
    setModalAgregarVisible(false);
  };

  // Función para obtener recursos y activos
  const obtenerRecursosActivos = () => {
    fetch('https://localhost:4000/recursosActivo')
      .then((response) => response.json())
      .then((data) => {
        setRecursosActivos(data)
        console.log(data)
      })
      .catch((error) => console.error(error));
  };

  const mostrarModalEdicion = (recursoActivo) => {
    setRecursoActivoSeleccionado(recursoActivo);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setRecursoActivoSeleccionado(null);
    setModalVisible(false);
  };

  const eliminarRecurso = () => {
    fetch(`https://localhost:4000/recursos/${recursoActivoSeleccionado.Idrecurso}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Recurso eliminado',
            text: 'El recurso ha sido eliminado correctamente',
            confirmButtonText: 'OK'
          })
          obtenerRecursosActivos();
          cerrarModal();
        } else {
          console.error('Error al eliminar el recurso');
        }
      }
      )
      .catch((error) => {
        console.error('Error al eliminar el recurso:', error);
      })
  }

  const ObtenerCategoriaRecursosActivos = () => {
    fetch('https://localhost:4000/categoriasRecursos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCategorias(data)
      })
      .catch((error) => console.error(error));
  }

  const agregarRecurso = () => {
    if (nuevoRecurso.nombre.trim() === "" || nuevoRecurso.descripcion.trim() === "" || nuevoRecurso.disponibilidad.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        confirmButtonText: 'OK'
      })
      return;
    }
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de agregar este recurso?',
      text: 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Si, agregar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('https://localhost:4000/recursos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(nuevoRecurso)
        })
          .then((response) => { 
            if (response.ok) {
              Swal.fire({
                icon:"success",
                title: "Recurso agregado",
                text: "El recurso ha sido agregado correctamente",
                confirmButtonText: "OK"
              })
              obtenerRecursosActivos();
              cerrarModalAgregar();
            }
          })
          .catch((error) => {console.log(error)})
      }
    })
  };

  const actualizacionRecurso = () => {
    if (nuevoRecurso.nombre.trim() === "" || nuevoRecurso.descripcion.trim() === "" || nuevoRecurso.disponibilidad.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        confirmButtonText: 'OK'
      })
      return;
    }
    console.log(recursoActivoSeleccionado);
    fetch(`https://localhost:4000/recursos/${recursoActivoSeleccionado.Idrecurso}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre: recursoActivoSeleccionado.recursoNombre,
        descripcion: recursoActivoSeleccionado.recursoDescripcion,
        disponibilidad: recursoActivoSeleccionado.recursoDisponibilidad,
        tipo: recursoActivoSeleccionado.recursoTipo,
        categoria: recursoActivoSeleccionado.idCategoria
      })
    })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Recurso actualizado",
          text: "El recurso ha sido actualizado correctamente",
          confirmButtonText: "OK"
        })
        obtenerRecursosActivos();
        cerrarModal();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Algo ha salido mal, intentalo mas tarde",
          confirmButtonText: "OK"
        })
      })
  }

  const actualizarRecurso = () => {
    if (recursoActivoSeleccionado.nombre.trim() === "" || recursoActivoSeleccionado.descripcion.trim() === "" || recursoActivoSeleccionado.disponibilidad.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        confirmButtonText: 'OK'
      })
      return;
    }
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de actualizar este recurso?',
      text: 'Se actualizará el recurso',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar'
    }
    ).then((result) => {
      if (result.isConfirmed) {

        Swal.fire("Recurso actualizado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("El proceso ha sido cancelado", "", "info");
      }
    })

  }

  useEffect(() => {
    obtenerRecursosActivos();
    ObtenerCategoriaRecursosActivos()
  }, []);

  return (
    <div className='w-full h-auto bg-slate-200'>
      <Header />
      <div className='w-full flex'>
        <SidebarAdmin />
        <div className='w-full h-full'>
          <div className='bg-white my-3 w-full h-20 flex justify-between align-middle'>
            <h1 className='text-2xl font-semibold italic p-5'>Recursos y Activos</h1>
            <button className='font-medium text-center text-lg italic bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5] p-2 mx-5 my-5 rounded-lg text-white' onClick={() => mostrarModalAgregar()}>
              Agregar nuevo recurso o activo
            </button>
          </div>
          <div className='w-11/12 h-full rounded-2xl bg-white mx-auto'>
            <div className='w-full h-[500px] m-10 mb-6 overflow-auto'>
              {recursosActivos.map((recursoActivo) => (
                <TarjetaRecurso
                  key={recursoActivo.Idrecurso} // Asegúrate de proporcionar un identificador único para cada recurso/activo
                  recurso={recursoActivo}
                  onEditar={() => mostrarModalEdicion(recursoActivo)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal de Edición */}
      {modalVisible && (
        <Modal
          isOpen={true} // Puedes gestionar la visibilidad del modal con un estado si es necesario
          onRequestClose={cerrarModal}
          contentLabel="Modal de Edición"
          className="w-1/2 mx-auto my-20"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg overflow-auto h-[600px]">
            <div>
              <button className="bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5]  text-white px-4 py-2 rounded hover:bg-gray-400" onClick={cerrarModal}>
                X
              </button>
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/993/993510.png" alt="Imagen del recurso" className="w-32 h-32 m-auto mx-auto" />
            <h2 className="text-3xl font-bold my-4">Detalles del Recurso o Activo</h2>
            <div className="mb-2">
              <label className="font-semibold text-2xl">Nombre:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={recursoActivoSeleccionado.recursoNombre}
                onChange={(e) => setRecursoActivoSeleccionado({ ...recursoActivoSeleccionado, recursoNombre: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold text-2xl">Descripción:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={recursoActivoSeleccionado.recursoDescripcion}
                onChange={(e) => setRecursoActivoSeleccionado({ ...recursoActivoSeleccionado, recursoDescripcion: e.target.value })}
              />
            </div>
            <div className="mb-2 flex flex-col">
              <label className="font-semibold text-2xl">Disponibilidad:</label>
              <select className='border border-gray-300 p-2 rounded w-full'
                value={setRecursoActivoSeleccionado.recursoDisponibilidad}
                onChange={(e) => setRecursoActivoSeleccionado({ ...recursoActivoSeleccionado, recursoDisponibilidad: e.target.value })}
              >
                <option value="Disponible" className=''>Disponible</option>
                <option value="No Disponible" clas>No Disponible</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="font-semibold text-2xl">Tipo:</label>

              <select className='border border-gray-300 p-2 rounded w-full'
                value={setRecursoActivoSeleccionado.recursoTipo}
                onChange={(e) => setRecursoActivoSeleccionado({ ...recursoActivoSeleccionado, recursoTipo: e.target.value })}
              >
                <option value="Recurso" className=''>Recurso</option>
                <option value="Activo" clas>Activo</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="font-semibold text-2xl">Categoria:</label>
              <select className='border border-gray-300 p-2 rounded w-full'
                value={recursoActivoSeleccionado.idCategoria}
                onChange={(e) => setRecursoActivoSeleccionado({ ...recursoActivoSeleccionado, idCategoria: Number(e.target.value) })}
              >
                {categorias.map((categoria) => (
                  <option value={categoria.id}>{categoria.nombre}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="font-semibold text-2xl">Descripción categoria:</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={recursoActivoSeleccionado.categoriaDescripcion}
                disabled={true} // Deshabilitar el campo de descripción de categoría para que no se pueda editar
              />
            </div>
            <div className="flex justify-between mt-5">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto" onClick={() => actualizacionRecurso()}>Editar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 mx-auto" onClick={() => eliminarRecurso()}>Eliminar</button>
            </div>
          </div>
        </Modal>
      )}
      {/* Modal de Agregar Nuevo Recurso */}
      <Modal
        isOpen={modalAgregarVisible}
        onRequestClose={cerrarModalAgregar}
        contentLabel="Modal de Agregar Nuevo Recurso"
        className="w-1/2 mx-auto my-20"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg overflow-auto h-[600px]">
          <div>
            <button className="bg-gradient-to-r from-[#1E4C6A]  to-[#1B7FC5]  text-white px-4 py-2 rounded hover:bg-gray-400" onClick={cerrarModalAgregar}>
              X
            </button>
          </div>
          <h2 className="text-3xl font-bold my-4">Agregar Nuevo Recurso</h2>
          <div className="mb-2">
            <label className="font-semibold text-2xl">Nombre:</label>
            <input type="text" className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, nombre: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold text-2xl">Descripción:</label>
            <input type="text" className="border border-gray-300 p-2 rounded w-full"
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, descripcion: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="font-semibold text-2xl">Disponibilidad:</label>
            <select className='border border-gray-300 p-2 rounded w-full' onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, disponibilidad: e.target.value })}>
              <option value="Disponible">Disponible</option>
              <option value="No Disponible">No Disponible</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-2xl">Tipo:</label>
            <select className='border border-gray-300 p-2 rounded w-full' onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, tipo: e.target.value })}>
              <option value="Recurso">Recurso</option>
              <option value="Activo">Activo</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="font-semibold text-2xl">Categoria:</label>
            <select className='border border-gray-300 p-2 rounded w-full' onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, categoria: e.target.value })}>
              {categorias.map((categoria) => (
                <option value={categoria.id}>{categoria.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-5">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto" onClick={agregarRecurso}>Agregar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RecursosActivosAdmin;
