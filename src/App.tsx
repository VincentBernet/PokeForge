import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const App = () => {
	/**
	 * TODO:
	 * - Use a json file to store Pokemon names & ids.
	 * - When a Pokemon is selected, contact openAI to generate a team based on the selected Pokemon.
	 * - Store the team in a state
	 * - Stream the response from openAI to display the team description as it's being generated.
	 * - Use the PokeAPI to get the sprites of the Pokemon in the team.
	 * - Display the team in a nice way.
	 */
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4 pb-60 text-foreground">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
				PokeForge
			</h1>
			<div className="card">
				<Select>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select a fruit" />
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
		</div>
	);
};

export default App;
