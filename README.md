# Vite App Setup Guide

This guide will help you set up and run the Vite application.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended: v16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

### 1. Clone the Repository

```sh
git clone <https://github.com/pavankumaroff/task_management_app_frontend.git>
cd <task_management_app_frontend>
```

### 2. Install Dependencies

Run the following command to install project dependencies:

```sh
npm install
```

or

```sh
yarn install
```

### 3. Create a `.env` File

In the root directory of the project, create a `.env` file and add the following content:

```
VITE_APP_API_URL=http://localhost:9000/api
```

Replace `http://localhost:9000/api` with the actual backend API base URL if different.

### 4. Run the Development Server

To start the development server, run:

```sh
npm run dev
```

or

```sh
yarn dev
```

This will start the Vite development server, and you can access the app at:

```
http://localhost:5173
```

(Default port may vary; check the terminal output for the correct URL.)

### 5. Build for Production

To create an optimized production build, run:

```sh
npm run build
```

or

```sh
yarn build
```

The built files will be available in the `dist/` directory.

### 6. Preview Production Build

To serve the production build locally:

```sh
npm run preview
```

or

```sh
yarn preview
```

## Troubleshooting

- Ensure `.env` is correctly set up.
- Restart the server after changing environment variables.
- Check for missing dependencies by running `npm install` or `yarn install`.

## License

This project is licensed under [MIT License](LICENSE).
