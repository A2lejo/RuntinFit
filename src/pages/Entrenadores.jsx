import React, { useState } from 'react';
import { ConfirmAlert, confirmDeleteAlert, successAlert } from '../utils/AlertFunctions.js';
import TablaEntrenadores from '../components/TablaEntrenadores';

const Entrenadores = () => {
  const [entrenadores, setEntrenadores] = useState([
    { id: 1, nombre: 'Juan Pérez', especialidad: 'Cardio', email: 'juan@example.com', telefono: '+123 456 7890', estado: 'activo' },
    { id: 2, nombre: 'María López', especialidad: 'Fuerza', email: 'maria@example.com', telefono: '+123 456 7891', estado: 'activo' },
    { id: 3, nombre: 'Carlos García', especialidad: 'Yoga', email: 'carlos@example.com', telefono: '+123 456 7892', estado: 'activo' },
  ]);

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para el formulario del nuevo entrenador
  const [form, setForm] = useState({
    nombre: '',
    especialidad: '',
    email: '',
    telefono: '',
  });

  // Estado para la búsqueda
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para agregar el entrenador
    const newEntrenador = {
      id: entrenadores.length + 1,
      nombre: form.nombre,
      especialidad: form.especialidad,
      email: form.email,
      telefono: form.telefono,
      estado: 'activo',
    };
    setEntrenadores([...entrenadores, newEntrenador]);
    setIsModalOpen(false);
    ConfirmAlert('', 'El entrenador ha sido agregado.');
  };

  const handleDelete = async (id) => {
    const confirmDelete = await confirmDeleteAlert();
    if (confirmDelete) {
      setEntrenadores(entrenadores.filter((entrenador) => entrenador.id !== id));
      successAlert('El entrenador ha sido eliminado');
    }
  };

  // Filtrar entrenadores basados en la búsqueda
  const filteredEntrenadores = entrenadores.filter((entrenador) =>
    entrenador.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Simulación de autenticación y rol del usuario
  const auth = { rol: 'admin' }; // Cambia esto según el rol del usuario

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">Entrenadores Registrados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
        >
          <span className="md:hidden">Agregar</span>
          <span className="hidden md:inline">Agregar Entrenador</span>
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="border-2 w-full p-2 rounded-md"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {filteredEntrenadores.length === 0 ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">No existen registros</p>
          <p>Actualmente no hay entrenadores registrados.</p>
        </div>
      ) : (
        <TablaEntrenadores entrenadores={filteredEntrenadores} handleDelete={handleDelete} auth={auth} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Agregar <span className="hidden md:inline">Entrenador</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="especialidad">
                  Especialidad
                </label>
                <input
                  id="especialidad"
                  name="especialidad"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.especialidad}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entrenadores;