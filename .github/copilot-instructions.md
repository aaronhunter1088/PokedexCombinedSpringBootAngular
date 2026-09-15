# PokedexApiUI - Copilot Instructions

## Project Overview

PokedexApiUI is an Angular-based front-end application for the PokedexApi project. This is a Pokémon information viewer that displays data about Pokémon, their evolutions, and related information. The application connects to a backend API to fetch Pokémon data.

### Technology Stack

- **Framework**: Angular 20.x
- **Language**: TypeScript 5.x
- **Build Tool**: Angular CLI 20.x
- **Node Version**: 24.x
- **Package Manager**: npm 11.x
- **Testing**: Jasmine + Karma
- **UI Components**: Angular Material
- **State Management**: RxJS 7.5.0
- **Additional Libraries**: 
  - ngx-pagination 6.0.3
  - ngx-order-pipe 3.0.0
  - pokeapi-js-wrapper 1.2.2

### Repository Size & Structure

- Approximately 3,900 lines of code (TypeScript, HTML, CSS)
- Angular application with modular component architecture
- 645 npm packages in node_modules

## Build & Development Commands

### Initial Setup

**ALWAYS run `npm install` first** when starting work on this repository or after any dependency changes:

```bash
npm install
```

This installs all dependencies defined in package.json. Expect ~23 seconds installation time.

### Development Server

Run the development server with hot reload:

```bash
npm start
# or
ng serve
```

- **Default port**: 4203 (configured in angular.json)
- **URL**: http://localhost:4203/
- The application automatically reloads when source files change
- Uses environments to redirect API calls to the backend server

### Building the Application

Build the application for production:

```bash
npm run build
```

- Output directory: `dist/pokedexapiui`
- Build configuration: Uses `@angular/build:application` builder
- **Note**: The production build performs font optimization which requires internet access to Google Fonts. In restricted environments, use `npm run build -- --optimization=false` to bypass this.
- Budget limits are configured (900KB warning, 1MB error for initial bundle)
- Build time: Approximately 5-15 seconds

Alternative build commands:

```bash
# Build for development with source maps
npm run watch

# Build for server deployment
npm run build-server
```

### Running Tests

Execute unit tests via Karma:

```bash
npm test
# or
ng test
```

- Test files use `.spec.ts` suffix
- Configuration: tsconfig.spec.json and angular.json test section
- Uses Jasmine framework with Karma test runner
- Browser: Chrome (karma-chrome-launcher)

### Code Scaffolding

Generate new Angular components/services:

```bash
# Generate a component
ng generate component component-name

# Generate other artifacts
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## Project Structure & Architecture

### Directory Layout

```
/
├── .github/                    # GitHub-specific files (workflows, copilot instructions)
├── .run/                       # IDE run configurations
├── .vscode/                    # VS Code settings
├── src/                        # Main source code directory
│   ├── app/                    # Application components and modules
│   │   ├── services/           # Services (pokemon.service.ts, dark-mode.service.ts)
│   │   ├── pokedex/            # Pokedex component
│   │   ├── pokemon-list/       # Pokemon list component
│   │   ├── search/             # Search component
│   │   ├── evolutions/         # Evolution display component
│   │   ├── evolves-how/        # Evolution details component
│   │   ├── app.component.*     # Root app component
│   │   ├── app.module.ts       # Main app module (imports, declarations)
│   │   ├── app-routing.module.ts  # Routing configuration
│   │   └── array-sort.pipe.ts  # Custom sorting pipe
│   ├── assets/                 # Static assets (images, etc.)
│   ├── environments/           # Environment configurations
│   │   ├── environment.ts              # Production environment
│   │   └── environment.development.ts  # Development environment
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application entry point
│   └── styles.css              # Global styles
├── angular.json                # Angular CLI configuration
├── package.json                # npm dependencies and scripts
├── proxy.conf.js               # Development proxy configuration
├── tsconfig.json               # TypeScript configuration (root)
├── tsconfig.app.json           # TypeScript config for application
├── tsconfig.spec.json          # TypeScript config for tests
└── README.md                   # Project documentation
```

### Key Files

- **angular.json**: Configures build, serve, and test options. Port 4203 is set here. Proxy configuration is referenced for both development and production serve modes.
- **proxy.conf.js**: No longer used. Left to show how it worked before environments were introduced.
- **app.module.ts**: Main application module that imports Angular Material, HTTP client, pagination, and routing modules. Declares all components and provides PokemonService.
- **app-routing.module.ts**: Defines application routes.
- **tsconfig.json**: Strict mode enabled, targets ES2022, uses bundler module resolution.

### Component Architecture

The application follows Angular's component-based architecture:

1. **AppComponent**: Root component with router outlet
2. **PokedexComponent**: Main Pokédex display
3. **PokemonListComponent**: Lists Pokémon with pagination
4. **SearchComponent**: Search functionality
5. **EvolutionsComponent**: Displays evolution chains
6. **EvolvesHowComponent**: Shows evolution requirements

Services:
- **PokemonService**: Handles API calls and data management
- **DarkModeService**: Manages dark mode toggle

Pipes:
- **ArraySortPipe**: Custom pipe for sorting arrays

### Material Design Theme

Uses Angular Material with the `deeppurple-amber` prebuilt theme (configured in angular.json styles section).

## Configuration Files

- **.editorconfig**: Editor configuration for consistent coding styles
- **.gitignore**: Excludes node_modules, dist, IDE files, etc.
- **tsconfig.*.json**: TypeScript compiler options with strict mode enabled

## Development Workflow

1. **Install dependencies**: `npm install` (always do this first)
2. **Start dev server**: `npm start` (runs on port 4203)
3. **Make changes**: Edit files in src/
4. **Test changes**: `npm test` to run unit tests
5. **Build**: `npm run build` to verify production build

## Common Issues & Workarounds

### Build Issues

- **Font optimization errors**: The production build tries to inline Google Fonts. In sandboxed or restricted network environments, this fails. Use `npm run build -- --optimization=false` as a workaround.
- **Budget exceeded warnings/errors**: The build has budget limits (900KB warning, 1MB error). These may be exceeded but are informational for bundle size management.

### Environment-Specific Issues

- The proxy configuration is currently commented out in proxy.conf.js. If backend API integration is needed, uncomment and configure appropriately.
- The application expects the backend API to be available when running in production mode.

## Additional Notes

- **Inception Year**: 2024
- **Version**: 1.3.22
- The project was initially generated with Angular CLI 15.0.2 but has been upgraded to Angular 20+
- A JavaScript debugger can be attached for debugging (see README.md for detailed setup)
- The `javascriptDebuggerReset.sh` script is available for debugging setup

## Instructions for Copilot Coding Agent

When making changes to this repository:

1. **Always run `npm install`** before attempting to build or test
2. **Use `npm run build -- --optimization=false`** if the standard build fails due to network restrictions
3. **Follow Angular conventions**: Components in their own directories, services in src/app/services/
4. **Maintain TypeScript strict mode**: The project uses strict type checking
5. **Add tests**: When creating new components/services, generate corresponding `.spec.ts` files
6. **Check routing**: Update app-routing.module.ts if adding new routable components
7. **Update app.module.ts**: Add new components to declarations and new modules to imports
8. **Follow the existing code style**: Use the EditorConfig settings
9. **Test your changes**: Run `npm test` to ensure unit tests pass
10. **Verify builds**: Run `npm run build -- --optimization=false` to verify the build works

Trust these instructions for build, test, and development workflows. Only search for additional information if something documented here doesn't work as expected.
