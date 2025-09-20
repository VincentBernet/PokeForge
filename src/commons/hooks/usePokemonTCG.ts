import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import queryKeys from '@/commons/hooks/queryKeys';

export type PokemonTCGResponse = {
	data: PokemonCard[];
	page: number;
	pageSize: number;
	count: number;
	totalCount: number;
};

export type PokemonCard = {
	id: string;
	name: string;
	supertype: string;
	subtypes: string[];
	hp?: string;
	types?: string[];
	evolvesTo?: string[];
	rules?: string[];
	attacks?: Attack[];
	weaknesses?: Weakness[];
	retreatCost?: string[];
	convertedRetreatCost?: number;
	set: CardSet;
	number?: string;
	artist?: string;
	rarity?: string;
	nationalPokedexNumbers?: number[];
	legalities?: Legalities;
	images: CardImages;
	tcgplayer?: Tcgplayer;
};

export type Attack = {
	name: string;
	cost: string[];
	convertedEnergyCost?: number;
	damage?: string;
	text?: string;
};

export type Weakness = {
	type: string;
	value: string;
};

export type CardSet = {
	id: string;
	name: string;
	series: string;
	printedTotal?: number;
	total?: number;
	legalities?: Legalities;
	ptcgoCode?: string;
	releaseDate?: string;
	updatedAt?: string;
	images?: {
		symbol?: string;
		logo?: string;
	};
};

export type Legalities = {
	unlimited?: string;
	expanded?: string;
};

export type CardImages = {
	small: string;
	large: string;
};

export type Tcgplayer = {
	url?: string;
	updatedAt?: string;
	prices?: {
		[key: string]: {
			low?: number;
			mid?: number;
			high?: number;
			market?: number;
			directLow?: number;
		};
	};
};

type PokemonCardInfo = {
	pokemonName: string;
	image: string;
};

const getPokemonCards = async (
	pokemonName: string,
): Promise<PokemonCardInfo> => {
	const response = await axios.get<PokemonTCGResponse>(
		`https://api.pokemontcg.io/v2/cards?q=name:"${pokemonName}"&pageSize=1&page=1&supertype:"Pokémon"`,
		{
			headers: {
				'X-Api-Key': import.meta.env.VITE_POKEMON_TCG_API_KEY,
			},
		},
	);
	const randomIndex = Math.floor(Math.random() * response.data.data.length);
	return {
		pokemonName: response.data.data[randomIndex].name,
		image: response.data.data[randomIndex].images.large,
	};
};

const usePokemonTCG = (pokemonName: string) => {
	const query = useQuery({
		queryKey: queryKeys.pokemonTCG(pokemonName),
		queryFn: () => getPokemonCards(pokemonName),
	});
	return query;
};

export default usePokemonTCG;
