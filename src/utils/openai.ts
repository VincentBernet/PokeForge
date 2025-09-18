import OpenAI from 'openai';
import type { PokemonTeam, TeamGenerationRequest } from '../types/pokemon';
import { fetchMultiplePokemon } from './pokemonApi';

// Initialize OpenAI client only if API key is available
const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OpenAI API key not found. Please set VITE_OPENAI_API_KEY environment variable.',
    );
  }
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // Note: For demo purposes. In production, use a backend.
  });
};

interface TeamSuggestion {
  pokemon: string[];
  description: string;
  reasoning: string;
}

export const generatePokemonTeam = async ({
  selectedPokemon,
  userPreferences = {},
}: TeamGenerationRequest): Promise<PokemonTeam> => {
  const {
    difficulty = 'balanced',
    playstyle = 'balanced',
    generation,
  } = userPreferences;

  const prompt = `
You are a Pokemon team building expert. Generate a competitive team of 6 Pokemon including the selected Pokemon: ${selectedPokemon.name}.

Requirements:
- Include ${selectedPokemon.name} as one of the 6 team members
- Consider type coverage and synergy
- Difficulty level: ${difficulty}
- Playstyle preference: ${playstyle}
${generation ? `- Prefer Pokemon from generation ${generation} or earlier` : ''}

Please suggest 5 additional Pokemon that would complement ${selectedPokemon.name} well.
Only use actual Pokemon names (no spaces, lowercase, use hyphens for multi-word names like "mewtwo", "ho-oh", "tapu-koko").

Provide your response as a JSON object with this exact structure:
{
  "pokemon": ["${selectedPokemon.name}", "pokemon2", "pokemon3", "pokemon4", "pokemon5", "pokemon6"],
  "description": "A brief description of the team's overall strategy and strengths",
  "reasoning": "Detailed explanation of why each Pokemon was chosen and how they work together, including type coverage, roles, and synergies"
}

Focus on creating a balanced team with good type coverage, considering roles like:
- Physical/Special attackers
- Defensive walls
- Support/utility Pokemon
- Entry hazard setters/removers
- Speed control

Make sure all Pokemon names are valid and spelled correctly.
`;

  try {
    const openai = getOpenAIClient();

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a Pokemon team building expert. Always respond with valid JSON containing actual Pokemon names.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const teamSuggestion: TeamSuggestion = JSON.parse(content);

    // Fetch Pokemon data for all team members
    const pokemonData = await fetchMultiplePokemon(teamSuggestion.pokemon);

    return {
      pokemon: pokemonData,
      description: teamSuggestion.description,
      reasoning: teamSuggestion.reasoning,
    };
  } catch (error) {
    console.error('Error generating team:', error);

    // Fallback team if OpenAI fails
    const fallbackTeam = [
      selectedPokemon.name,
      'pikachu',
      'charizard',
      'blastoise',
      'venusaur',
      'lucario',
    ];

    const pokemonData = await fetchMultiplePokemon(fallbackTeam);

    return {
      pokemon: pokemonData,
      description: `A balanced team built around ${selectedPokemon.name} with versatile Pokemon that provide good type coverage.`,
      reasoning: `This team combines ${selectedPokemon.name} with popular and reliable Pokemon that offer diverse move sets and type coverage. Each member brings unique strengths to create a well-rounded team suitable for various battle scenarios.`,
    };
  }
};
