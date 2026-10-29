import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await axios.get('https://pokeapi.co');
        setPokemons(resposta.data.results);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setErro("Não foi possível carregar os dados da API.");
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  if (loading) return <div style={{padding: '20px'}}>Carregando Pokémons...</div>;
  if (erro) return <div style={{padding: '20px', color: 'red'}}>{erro}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Dashboard - PokéAPI</h1>
      <ul style={{ listStyleType: 'square' }}>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} style={{ textTransform: 'capitalize', margin: '8px 0', fontSize: '18px' }}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
