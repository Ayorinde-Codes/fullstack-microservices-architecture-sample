# Fullstack microservices architecture sample

This project demonstrates a microservices architecture using Node.js (TypeScript) for backend services and React.js (TypeScript) for the frontend. The architecture includes two backend servers, namely `country-backend-server` and `geodetails-backend-server`, and a frontend server called `frontend-server`.

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

## Note
First step is to use the postman collection and make request in  `Service 2(geodetails-server)`


To interact with the Geodetails Server (Service 2), follow these steps:

1. **Use Postman Collection**: Start by using the Postman collection provided in the repository. This collection contains requests for Service 2 (geodetails-server).

2. **Authentication**:

    - **Registration Endpoint:** [http://localhost:4002/api/auth/register](http://localhost:4002/api/auth/register)
    
        - In this step, you'll be creating a user. After making the request, you will receive an API key. This key serves as a security mechanism and will be used by other services to contact this service.

    - **Login Endpoint:** [http://localhost:4002/api/auth/login](http://localhost:4002/api/auth/login)
    
        - After successfully logging in, your API key will be returned.

    - **Regenerate API Key Endpoint:** [http://localhost:4002/api/auth/regenerate-api-key](http://localhost:4002/api/auth/regenerate-api-key)
    
        - Use this endpoint to regenerate your API key in case of security reasons or if you've forgotten the key.
