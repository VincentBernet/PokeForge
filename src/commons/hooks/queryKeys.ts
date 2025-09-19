const queryKeys = {
	openai: (pokemonSelected: string) => ['openai', pokemonSelected] as const,
	pokemonTCG: (pokemonName: string) => ['pokemonTCG', pokemonName] as const,
};

export default queryKeys;
