import type { PokemonTeam } from '../../types/pokemon';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import './TeamDisplay.css';

interface TeamDisplayProps {
  team: PokemonTeam;
  isGenerating?: boolean;
}

export const TeamDisplay = ({
  team,
  isGenerating = false,
}: TeamDisplayProps) => {
  if (isGenerating) {
    return (
      <div className="team-display">
        <div className="team-header">
          <h2>Generating Your Team...</h2>
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="team-display">
      <div className="team-header">
        <h2>Your Pokemon Team</h2>
        <p className="team-description">{team.description}</p>
      </div>

      <div className="team-grid">
        {team.pokemon.map((pokemon, index) => (
          <div key={pokemon.id} className="team-member">
            <div className="member-position">
              {index === 0 && <span className="starter-badge">Starter</span>}
            </div>
            <PokemonCard pokemon={pokemon} size="medium" showStats={false} />
          </div>
        ))}
      </div>

      <div className="team-reasoning">
        <h3>Team Strategy</h3>
        <div className="reasoning-content">
          {team.reasoning.split('\n').map(
            (paragraph, index) =>
              paragraph.trim() && (
                <p
                  key={`reasoning-${index}-${paragraph.slice(0, 20)}`}
                  className="reasoning-paragraph"
                >
                  {paragraph.trim()}
                </p>
              ),
          )}
        </div>
      </div>
    </div>
  );
};
