# Frontend
To run this project, you will need to have [Node](https://nodejs.org/en/) installed. We have used version 7, but we think versions 6.9 and above will work. You will also need the node package manager, this is probably included with the installer for Node.

To run this application you will need to install angular-cli. Installed by running `npm install -g angular-cli`. The newest version (@angular/cli) will not work with the configuration in this project.

To install the dependencies you must navigate to the frontend directory and run the command `npm install`.

You will need to copy the `src/app/local-settings.ts.example` to `local-settings.ts`, and change the settings for your backend. The default setting uses our running backend at api.laid.cool:8000. 

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.28.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
