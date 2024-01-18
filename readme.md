# Basalt Assessment

This project demonstrates a microservices architecture using Node.js (TypeScript) for backend services and React.js for the frontend. The architecture includes two backend servers, namely `country-backend-server` and `geodetails-backend-server`, and a frontend server called `frontend-server`.

## Technologies Used

- **Backend:**
  - Node.js (TypeScript)
  - MongoDB
  - Redis
  - ESLint for linting
  - Docker for containerization
  - microservices

- **Frontend:**
  - React.js
  - Docker for containerization

## Project Structure
   -  fontend-server
   -  country-backend-server
   -  geodetails-backend-server


## Configuration

Configurations are stored in the `.env.copy` file. Create a `.env` file from `.env.copy` and adjust the settings as needed.

## System Requirements (Development)

- Docker (v20+)
- Docker Compose (2+)

## Postman Collection

[Postman Collection](https://api.postman.com/collections/14268941-1daedcf5-2b9f-42c5-a707-68f65a1dedcd?access_key=PMAT-01HMDFME65WY40E5SZE869505G)

## Folder Architecture

-   fontend-server
-   country-backend-server
-   geodetails-backend-server

## Config Files

Configurations are in the `.env.copy` file. Need to create `.env` file from `.env.copy` and make change as your configuration.

## Run Project

Use `docker-compose up --build` build and run the project locally with port `4000`. After running the project a MongoDB instance is started.

After running the project proceed to [http://localhost:4000](http://localhost:4000) from the browser. From the browser, you can perform two major actions that interact with all the servers, get all countries and second request get the geo details of the countries.

## Dockerized Services

All three servers (frontend, country backend, and geo details backend) are containerized. The provided Docker Compose file simplifies the setup.

Feel free to explore and interact with the application!

**Note:** Ensure you have the necessary dependencies installed, including Docker and Docker Compose.
**Note:** You also have to register and generate api-keys: GEODETAILS_API_KEY for comunication between api's
