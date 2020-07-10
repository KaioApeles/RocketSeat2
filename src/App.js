import React, { useEffect, useState } from "react";
import Api from './services/api';

import "./styles.css";

function App() {

  const [repo, setRepo] = useState([]);

  useEffect( () => {
    Api.get('repositories').then( response => {
      setRepo(response.data);
    });
  }, []);
    
  async function handleAddRepository() {

    const response = await Api.post('repositories', { ...repo, title: "teste" });

    setRepo([...repo, response.data]);

  }

  async function handleRemoveRepository(id) {
    await Api.delete(`/repositories/${id}`);

    const projectIndex = repo.findIndex( repo => id === repo.id );

    repo.splice(projectIndex, 1);

    setRepo([...repo]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repo.map( item => (
          <li key={item.id}>  
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover 
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
