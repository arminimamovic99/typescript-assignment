## Overview of features/changes

- In the frontend I focused on eliminating bad practices and using industry standard approaches - Observables and reactive programming
- The backend is a simple Express server with a RESTful API and authentication

Refactoring:

- I started with analizing the project code, identifiying bad practices and setting up better architecture.
First and foremost I noticed all classes were in one file, the app.component.ts. 
I separated each class into it's own file, fixed some typos I found and refactored the MessageService to use observables instead of promises. I also removed the Message class and switched to using an interface. Currently it's located in shared/models.

Authentication:

- I proceeded to set up the API with basic endpoints to add new and retrieve existing messages. I added token-based authorization which i found most fitting for this kind of application.
When a user logs in, we return a token from the API, which is then stored in local storage. As long as the token is present, the user is authorized and can access the /chat route where they can read and add messages. If the token is not present in the storage, the user is redirected to the login page. And vice-versa, if a user tries to reach the login page but is already authorized, they are automatically redirected to the app.
Also, I added an interceptor to add the token to each request, so that it is not done in each service method before the request is sent. The backend will throw a 401 unauthorized error if a request is sent without a token.
I must note that we use dummy users defined in the backend since this is just a proof-of-knowledge mock application.

Routing: 

- Since routes were not configured, I set it up and added 2 routes: /login and /chat.
- I added the router outlet into the root component instead of rendering each component from there.
- The /chat route is protected by an CanActivate auth guard.
- The /login route is also 'protected' by a CanActivate guard which redirects the user to /chat if they are already logged in.

Chat:

- In the chat page, the user can see an overview of messages, and for each message, the user who sent it, and status is shown along with the message content.
- The user can submit a new message and the page is asynchronously refreshed. 



## Overview of the Recruitment Exercise

This is a dummy project, which is used to demonstrate knowledge of node and Angular as well as development in general. It serves as an example with some bad practices included.

### Technologies:

- Backend: Node.js
- Frontend: Angular
- API: REST with an openapi.yaml file

**Duration: 5-8 hours**

## Exercise Structure

### Repository Structure:

`/backend` - Should contain all backend-related files.

`/frontend` - Contains all frontend-related files.

`/docs` - Contains the openapi.yaml file and any additional documentation.

#### Backend (/backend):

index.ts - Should contain main server file using Node.js.

#### Frontend (/frontend):

app.component.ts - Main application file for Angular.

##### API Definition (/docs):

openapi.yaml

## Tasks:

### Backend:
- [ ] Implement the backend architecture from scratch, which will support the Angular application's API calls.
- [ ] Implement error handling.
- [ ] Implement the plugin system for extensibility (Chatbot).
- [ ] Add authentication for message sending.
### Frontend:
- [ ] Optimize data bindings and state management.
- [ ] Improve the user interface responsiveness.
- [ ] Implement a feature to display message status (sent, received).
- [ ] Add seamless communication with the backend application.
- [ ] Create a login form to allow users to log in and send messages.
### API:
- [ ] Review and if necessary correct RESTful API practices.
- [ ] Ensure best practices in the API definition.

## General instructions

- Make sure to follow best practices.
- Pay attention to the code quality as well as software architecture. We value maintainability and readability.
- We recommend documenting your changes and the reasoning behind them.
- Git history is important. Make sure to commit your changes as you progress.
- Feel free to ask questions if you have any doubts.
- We are looking for a clean, well-structured solution that demonstrates your understanding of the technologies used.

## Deliverables

- [ ] send in files with your comments by (one of)
    - Inline-Code-Comments and send us the files
    - drop the files anywhere and send us the link
    - upload the code to your own Repository (Avoid forking the repository and creating a PR, as this would make your solution visible to others)
- [ ] A brief report summarizing the changes you made, why, and any additional recommendations if they had more time.

## Run instructions

- Backend: `cd backend && npm install && npm run build && npm run start`
- Frontend: `cd frontend && npm install && npm run serve`
- API: `openapi.yaml` file contains the API definition.
- Access the frontend at `http://localhost:4200`.
- Access the backend at `http://localhost:3000`.
- Note: The project is set up to run on localhost by default.
