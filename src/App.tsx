import TeamGeneratorPage from '@/features/team-generator/TeamGeneratorPage';

const App = () => {
	/**
	 * TODO:
	 * - Use a json file to store Pokemon names & ids.
	 * - When a Pokemon is selected, contact openAI to generate a team based on the selected Pokemon.
	 * - Store the team in a state
	 * - Stream the response from openAI to display the team description as it's being generated.
	 * - Use the PokeAPI to get the sprites of the Pokemon in the team.
	 * - Display the team in a nice way.
	 * import OpenAI from "openai";
	 */
	return <TeamGeneratorPage />;
};

export default App;
