import { useQuery } from '@tanstack/react-query';
import OpenAI from 'openai';
import { z } from 'zod';
import queryKeys from '@/commons/hooks/queryKeys';

const client = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

const TeamSchema = z.object({
	team: z.array(z.string()).length(6),
	description: z.string(),
});

type LLMFormatedResponse = z.infer<typeof TeamSchema>;

const getOpenApiResponse = async (
	pokemonSelected: string,
): Promise<LLMFormatedResponse> => {
	const response = await client.responses.create({
		model: 'gpt-5-nano',
		input: `Generate a random Pokémon team of 6, including ${pokemonSelected} as the first Pokémon of the team. 
			Return only a JSON object in the following format and nothing else:
    		{
      			"team": ["pokemon1", "pokemon2", "pokemon3", "pokemon4", "pokemon5", "pokemon6"],
      			"description": "A brief description of the team and its strategy."
			}`,
	});

	const textOutput = response.output_text ?? '';
	const result = TeamSchema.safeParse(JSON.parse(textOutput));

	if (!result.success) {
		throw new Error(`Response did not match schema: ${result.error.message}`);
	}

	return result.data;
};

const useOpenAi = (pokemonSelected: string) => {
	const query = useQuery({
		queryKey: queryKeys.openai(pokemonSelected),
		queryFn: () => getOpenApiResponse(pokemonSelected),
	});
	return query;
};

export default useOpenAi;
