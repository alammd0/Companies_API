
# Companies API

This is a simple REST API to manage a list of companies. It allows you to create, read, update, and delete companies. It also supports searching and filtering.

## Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGODB_URL=<your_mongodb_url>
PORT=3000
```

## Dependencies

- [express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- [mongoose](https://mongoosejs.com/): Elegant mongodb object modeling for node.js
- [cors](https://www.npmjs.com/package/cors): Node.js CORS middleware
- [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from .env file
- [nodemon](https://www.npmjs.com/package/nodemon): Simple monitor script for use during development of a node.js app

## Available Scripts

- `npm start`: Starts the server
- `npm run dev`: Starts the server in development mode
- `npm run seed`: Seeds the database with some initial data

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/v1/companies` | Get all companies |
| GET | `/api/v1/companies/:id` | Get a single company by id |
| POST | `/api/v1/companies` | Create a new company |
| PUT | `/api/v1/companies/:id` | Update a company by id |
| DELETE | `/api/v1/companies/:id` | Delete a company by id |

## Seeding the Database

To seed the database with some initial data, run the following command:

```
npm run seed
```

## Search and Filtering

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

## Day - 01 