import type { Pokemon } from '../../types/pokemon';
import {
  formatPokemonId,
  getDisplayName,
  getPokemonImageUrl,
  getTypeColor,
} from '../../utils/pokemonApi';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  size?: 'small' | 'medium' | 'large';
  showStats?: boolean;
}

export const PokemonCard = ({
  pokemon,
  size = 'medium',
  showStats = false,
}: PokemonCardProps) => {
  const imageUrl = getPokemonImageUrl(pokemon);
  const displayName = getDisplayName(pokemon.name);
  const pokemonId = formatPokemonId(pokemon.id);

  return (
    <div className={`pokemon-card ${size}`}>
      <div className="card-header">
        <span className="pokemon-id">{pokemonId}</span>
        <h3 className="pokemon-name">{displayName}</h3>
      </div>

      <div className="pokemon-image-container">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={displayName}
            className="pokemon-image"
            loading="lazy"
          />
        ) : (
          <div className="pokemon-image-placeholder">
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="pokemon-types">
        {pokemon.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className="type-badge"
            style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
          >
            {typeInfo.type.name.charAt(0).toUpperCase() +
              typeInfo.type.name.slice(1)}
          </span>
        ))}
      </div>

      {showStats && (
        <div className="pokemon-stats">
          <div className="stat-row">
            <span className="stat-label">Height:</span>
            <span className="stat-value">
              {(pokemon.height / 10).toFixed(1)}m
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Weight:</span>
            <span className="stat-value">
              {(pokemon.weight / 10).toFixed(1)}kg
            </span>
          </div>
          <div className="base-stats">
            {pokemon.stats.map((stat) => {
              const statName = stat.stat.name
                .replace('-', ' ')
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <div key={stat.stat.name} className="base-stat">
                  <span className="stat-name">{statName}:</span>
                  <span className="stat-value">{stat.base_stat}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                        backgroundColor:
                          stat.base_stat > 100
                            ? '#10b981'
                            : stat.base_stat > 60
                              ? '#f59e0b'
                              : '#ef4444',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
