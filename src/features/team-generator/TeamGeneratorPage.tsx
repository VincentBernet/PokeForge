import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/commons/design-system/select';
import OpenAIContainer from '@/features/team-generator/components/OpenAIContainer';

const TeamGeneratorPage = () => {
	const [selectedPokemon, setSelectedPokemon] = useState<string>('');
	return (
		<div className="flex flex-col items-center min-h-screen bg-background p-4 text-foreground gap-4">
			<div>
				{/** TODO: Use a ComboBox instead */}
				<Select onValueChange={setSelectedPokemon} value={selectedPokemon}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a Pokémon" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>First Generation</SelectLabel>
							<SelectItem value="pikachu">Pikachu</SelectItem>
							<SelectItem value="bulbasaur">Bulbasaur</SelectItem>
							<SelectItem value="charmander">Charmander</SelectItem>
							<SelectItem value="squirtle">Squirtle</SelectItem>
							<SelectItem value="pidgey">Pidgey</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			{selectedPokemon && <OpenAIContainer selectedPokemon={selectedPokemon} />}
		</div>
	);
};
export default TeamGeneratorPage;
