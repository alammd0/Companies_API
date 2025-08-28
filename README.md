
# Companies MERN Project

This is a full-stack MERN (MongoDB, Express, React, Node.js) application to manage a list of companies. It includes a RESTful API backend and a React-based frontend.

## Backend

This is a simple REST API to manage a list of companies. It allows you to create, read, update, and delete companies. It also supports searching and filtering.

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGODB_URL=<your_mongodb_url>
PORT=3000
```

### Dependencies

- [express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- [mongoose](https://mongoosejs.com/): Elegant mongodb object modeling for node.js
- [cors](https://www.npmjs.com/package/cors): Node.js CORS middleware
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file
- [nodemon](https://www.npmjs.com/package/nodemon): Simple monitor script for use during development of a node.js app

### Available Scripts

In the `backend` directory:

- `npm install`: Installs dependencies.
- `npm start`: Starts the server.
- `npm run dev`: Starts the server in development mode with nodemon.
- `npm run seed`: Seeds the database with some initial data.

### API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/companies` | Get all companies |
| GET | `/api/v1/companies/:id` | Get a single company by id |
| POST | `/api/v1/companies` | Create a new company |
| PUT | `/api/v1/companies/:id` | Update a company by id |
| DELETE | `/api/v1/companies/:id` | Delete a company by id |

#### Search and Filtering

The `GET /api/v1/companies` endpoint supports the following query parameters for searching and filtering:

- `search`: Search for a company by name
- `name`: Filter by company name
- `industry`: Filter by industry
- `minEmployees`: Filter by minimum number of employees
- `maxEmployees`: Filter by maximum number of employees
- `minFounded`: Filter by minimum founded year
- `maxFounded`: Filter by maximum founded year
- `location`: Filter by location
- `website`: Filter by website
- `sort`: Sort by a field. Use `-` for descending order. e.g. `-createdAt`

### Seeding the Database

To seed the database with some initial data, run the following command in the `backend` directory:

```
npm run seed
```

## Frontend

A React application built with Vite that provides a user interface to view, filter, and create companies.

### Dependencies
- [React](https://react.dev/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): Next Generation Frontend Tooling.
- [Axios](https://axios-http.com/): Promise based HTTP client for the browser and node.js.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework.

### Available Scripts

In the `frontend` directory:

- `npm install`: Installs dependencies.
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the source code.
- `npm run preview`: Serves the production build locally. 