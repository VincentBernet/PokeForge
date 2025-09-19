import { AlertCircleIcon } from 'lucide-react';
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/commons/design-system/alert';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/commons/design-system/card';
import useOpenAi from '@/commons/hooks/useOpenAi';
import PokemonCard, {
	PokemonSkeleton,
} from '@/features/team-generator/components/PokemonCard';

type Props = {
	selectedPokemon: string;
};

const OpenAIContainer = ({ selectedPokemon }: Props) => {
	const { data, isPending, isError, error } = useOpenAi(selectedPokemon);

	if (isPending) {
		return (
			<div className="flex w-full flex-col items-center gap-4">
				<Card className="w-full max-w-[838px] text-justify">
					<CardContent>
						<div className="flex flex-wrap gap-4 font-bold text-lg">
							{Array.from({ length: 6 }).map((_, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <it's only for skeletons, not means to be dynamic>
								<PokemonSkeleton key={index} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<AlertCircleIcon />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					<p>{error.message}</p>
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<Card className="w-full max-w-[838px] text-justify">
				<CardContent>
					<div className="flex flex-wrap gap-4 font-bold text-lg">
						{data.team.map((pokemon) => (
							<PokemonCard key={pokemon} pokemonName={pokemon} />
						))}
					</div>
				</CardContent>
			</Card>
			<Card className="w-full max-w-[838px] text-justify">
				<CardHeader>
					<CardTitle>Description</CardTitle>
				</CardHeader>
				<CardContent>{data.description}</CardContent>
			</Card>
		</div>
	);
};
export default OpenAIContainer;
