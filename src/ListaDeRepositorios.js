import React, { useEffect, useState } from 'react';

function ListaDeRepositorios() {

  const [repositorio, setRepositorio] = useState([]);

  useEffect(() => {
    async function carregaRepositorios () {
      const response = await fetch('https://api.github.com/users/julio-cesar96/repos');
      const data = await response.json();

      setRepositorio(data);
    }
    carregaRepositorios();
  }, []);
  
    
  useEffect(() => {
    const filtro = repositorio.filter(repo => repo.favorite);

    document.title = `Você tem ${filtro.length} repositorios favoritos`;

  }, [repositorio]);


  function Favoritar(id) {
    const novoRepositorio = repositorio.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    });
    setRepositorio(novoRepositorio);
  }
  
  

  return (
    <>
      <ul>
        {repositorio.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span> (Favorito) </span>}
            <button onClick={() => Favoritar(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaDeRepositorios;




