import React, { useState, useEffect } from 'react';

const GitHubActivityWidget = ({ username, repository }) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/LuisGB20/Proyecto_gestion_proyectos1/commits`);
        const data = await response.json();

        if (response.ok) {
          setCommits(data.slice(0, 5)); // Mostrar solo los últimos 5 commits
        } else {
          console.error('Error al obtener los commits:', data.message);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchCommits();
  }, [username, repository]);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md shadow-md mx-auto mt-8 w-11/12 h-96 font-mono">
      <h3 className="text-5xl font-semibold mb-4">Actividad en GitHub</h3>
      <ul className="list-none p-0 m-0">
        {commits.map(commit => (
          <li key={commit.sha} className="mb-2">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 bg-orange-500 rounded-full"></div>
              <h1 className='text-3xl font-bold'>{commit.commit.author.name} </h1>: <span className='text-2xl font-semibold italic mr-auto'>{commit.commit.message}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubActivityWidget;
