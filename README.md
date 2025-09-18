# PokeForge

Generate your perfect Pokemon team with AI-powered team building!

![PokeForge Interface](https://github.com/user-attachments/assets/cf7ed3dd-95bd-4569-9967-94a60b4da41e)

## Features

- 🔍 **Fuzzy Search**: Find Pokemon with intelligent fuzzy search powered by Fuse.js
- 🤖 **AI Team Generation**: Use OpenAI to generate balanced, strategic Pokemon teams
- 🎨 **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds
- 🔧 **Type Safe**: Full TypeScript support for better development experience
- 📊 **Pokemon Cards**: Detailed Pokemon cards with stats, types, and beautiful sprites
- 🎯 **Team Strategy**: AI-generated explanations for team composition and strategy

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with custom designs
- **Linting**: Biome (replaces ESLint + Prettier)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Search**: Fuse.js for fuzzy search
- **AI**: OpenAI GPT for team generation
- **Pokemon Data**: PokeAPI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (for team generation)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PokeForge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Biome

## How to Use

1. **Search for a Pokemon**: Use the search bar to find any Pokemon with fuzzy search
2. **Select Your Starter**: Click on a Pokemon from the search results
3. **Generate Team**: Click "Generate Team" to create an AI-powered team around your selection
4. **View Strategy**: Read the detailed explanation of your team's strategy and synergies

## Features in Detail

### Pokemon Search
- Fuzzy search through 1000+ Pokemon
- Real-time results as you type
- Handles typos and partial matches

### AI Team Building
- Considers type coverage and synergies
- Balances offensive and defensive capabilities
- Provides detailed strategy explanations
- Uses competitive Pokemon knowledge

### Pokemon Cards
- Beautiful card design with official artwork
- Type badges with authentic colors
- Stats display with visual bars
- Height and weight information

### Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized for all screen sizes

## Project Structure

```
src/
├── components/          # React components
│   ├── PokemonSearch/  # Search component with fuzzy search
│   ├── PokemonCard/    # Pokemon display cards
│   └── TeamDisplay/    # Team grid and strategy display
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── pokemonApi.ts   # PokeAPI integration
│   └── openai.ts       # OpenAI integration
└── App.tsx             # Main application component
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | OpenAI API key for team generation | Yes |

## API Integration

### PokeAPI
- Fetches Pokemon data, sprites, and stats
- Provides comprehensive Pokemon database
- No API key required

### OpenAI API
- Generates team compositions
- Provides strategic explanations
- Requires API key and usage billing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [PokeAPI](https://pokeapi.co) for comprehensive Pokemon data
- [OpenAI](https://openai.com) for AI team generation
- Pokemon artwork from official sources
- Inspired by competitive Pokemon team building
