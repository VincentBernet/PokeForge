import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { usePokemonList } from '../../hooks/usePokemon';
import { getDisplayName } from '../../utils/pokemonApi';
import './PokemonSearch.css';

interface PokemonSearchProps {
  onSelectPokemon: (pokemonName: string) => void;
  selectedPokemon?: string;
}

export const PokemonSearch = ({
  onSelectPokemon,
  selectedPokemon,
}: PokemonSearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: pokemonList, isLoading, error } = usePokemonList();

  // Initialize Fuse for fuzzy search
  const fuse = useMemo(() => {
    if (!pokemonList?.results) return null;

    return new Fuse(pokemonList.results, {
      keys: ['name'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 1,
    });
  }, [pokemonList]);

  // Get filtered results
  const filteredResults = useMemo(() => {
    if (!fuse || !query.trim()) return [];

    const results = fuse.search(query.trim());
    return results.slice(0, 10).map((result) => result.item);
  }, [fuse, query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelectPokemon = (pokemonName: string) => {
    setQuery(getDisplayName(pokemonName));
    setIsOpen(false);
    onSelectPokemon(pokemonName);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow clicking on results
    setTimeout(() => setIsOpen(false), 200);
  };

  if (isLoading) {
    return (
      <div className="pokemon-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Loading Pokemon..."
            disabled
            className="search-input"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Error loading Pokemon"
            disabled
            className="search-input error"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-search">
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search for a Pokemon to start your team..."
          className="search-input"
        />

        {isOpen && query && filteredResults.length > 0 && (
          <div className="search-results">
            {filteredResults.map((pokemon) => (
              <button
                key={pokemon.name}
                type="button"
                className={`search-result-item ${
                  selectedPokemon === pokemon.name ? 'selected' : ''
                }`}
                onClick={() => handleSelectPokemon(pokemon.name)}
              >
                <span className="pokemon-name">
                  {getDisplayName(pokemon.name)}
                </span>
              </button>
            ))}
          </div>
        )}

        {isOpen && query && filteredResults.length === 0 && (
          <div className="search-results">
            <div className="no-results">
              No Pokemon found matching "{query}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
