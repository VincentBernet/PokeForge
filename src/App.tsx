import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { PokemonCard } from './components/PokemonCard/PokemonCard';
import { PokemonSearch } from './components/PokemonSearch/PokemonSearch';
import { TeamDisplay } from './components/TeamDisplay/TeamDisplay';
import { usePokemon } from './hooks/usePokemon';
import type { PokemonTeam } from './types/pokemon';
import { generatePokemonTeam } from './utils/openai';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [selectedPokemonName, setSelectedPokemonName] = useState<string>('');
  const [generatedTeam, setGeneratedTeam] = useState<PokemonTeam | null>(null);
  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false);
  const [error, setError] = useState<string>('');

  const { data: selectedPokemon, isLoading: isLoadingPokemon } = usePokemon(
    selectedPokemonName || '',
  );

  const handleSelectPokemon = (pokemonName: string) => {
    setSelectedPokemonName(pokemonName);
    setGeneratedTeam(null);
    setError('');
  };

  const handleGenerateTeam = async () => {
    if (!selectedPokemon) return;

    // Check if OpenAI API key is available
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setError(
        'OpenAI API key is required for team generation. Please set VITE_OPENAI_API_KEY in your environment.',
      );
      return;
    }

    setIsGeneratingTeam(true);
    setError('');

    try {
      const team = await generatePokemonTeam({
        selectedPokemon,
        userPreferences: {
          difficulty: 'balanced',
          playstyle: 'balanced',
        },
      });
      setGeneratedTeam(team);
    } catch (err) {
      console.error('Failed to generate team:', err);
      setError(
        'Failed to generate team. Please try again or check your OpenAI API key.',
      );
    } finally {
      setIsGeneratingTeam(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">PokeForge</h1>
        <p className="app-subtitle">Generate your perfect Pokemon team!</p>
      </header>

      <main className="app-main">
        <section className="search-section">
          <PokemonSearch
            onSelectPokemon={handleSelectPokemon}
            selectedPokemon={selectedPokemonName}
          />
        </section>

        {isLoadingPokemon && (
          <section className="loading-section">
            <div className="loading-spinner" />
            <p>Loading Pokemon...</p>
          </section>
        )}

        {selectedPokemon && !isLoadingPokemon && (
          <section className="selected-pokemon-section">
            <h2>Selected Pokemon</h2>
            <div className="selected-pokemon-container">
              <PokemonCard
                pokemon={selectedPokemon}
                size="large"
                showStats={true}
              />
            </div>

            {!generatedTeam && !isGeneratingTeam && (
              <button
                type="button"
                onClick={handleGenerateTeam}
                className="generate-team-button"
              >
                Generate Team
              </button>
            )}
          </section>
        )}

        {error && (
          <section className="error-section">
            <div className="error-message">
              <p>{error}</p>
              <small>
                Note: This demo requires an OpenAI API key. Set
                VITE_OPENAI_API_KEY in your environment.
              </small>
            </div>
          </section>
        )}

        {(generatedTeam || isGeneratingTeam) && (
          <section className="team-section">
            <TeamDisplay
              team={
                generatedTeam || { pokemon: [], description: '', reasoning: '' }
              }
              isGenerating={isGeneratingTeam}
            />

            {generatedTeam && (
              <div className="team-actions">
                <button
                  type="button"
                  onClick={handleGenerateTeam}
                  className="regenerate-button"
                >
                  Generate New Team
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with React, TypeScript, and the{' '}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokeAPI
          </a>
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
