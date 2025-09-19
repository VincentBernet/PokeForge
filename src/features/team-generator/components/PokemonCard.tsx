import { AlertCircleIcon } from 'lucide-react';
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '@/commons/design-system/alert';
import { Skeleton } from '@/commons/design-system/skeleton';
import usePokemonTCG from '@/commons/hooks/usePokemonTCG';

type Props = {
	pokemonName: string;
};

export const CARD_HEIGHT = 352;
export const CARD_WIDTH = 252;

export const PokemonSkeleton = () => (
	<Skeleton className={`w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px] rounded-md`} />
);

export const PokemonError = ({
	pokemonName,
	error,
}: {
	pokemonName: string;
	error: Error;
}) => (
	<Alert
		variant="destructive"
		className={`w-[${CARD_WIDTH}px] h-[${CARD_HEIGHT}px] rounded-md`}
	>
		<AlertCircleIcon />
		<AlertTitle>Error on {pokemonName}</AlertTitle>
		<AlertDescription>
			<p>{error.message}</p>
		</AlertDescription>
	</Alert>
);

const PokemonCard = ({ pokemonName }: Props) => {
	const { data, isPending, isError, error } = usePokemonTCG(pokemonName);
	if (isPending) {
		return <PokemonSkeleton />;
	}
	if (isError) {
		return <PokemonError pokemonName={pokemonName} error={error} />;
	}
	return (
		<img
			src={data.image}
			alt={data.pokemonName}
			className={`w-[${CARD_WIDTH}px] rounded-xs`}
		/>
	);
};

export default PokemonCard;
