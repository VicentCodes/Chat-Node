# Node-Real-time Chat

Node-Chat is a simple Node.js application that allows users to engage in a global and realtime chat. Users can register, log in, and send messages that are visible to everyone in the chat.

## Demo

Explore a live demo of Node-Chat by visiting [ChatDemo](https://chatweb-j27h.onrender.com).

## Features

- User registration and login
- Global chat functionality
- Real-time message updates using Server-Sent Events (SSE)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VicentCodes/Chat-Node.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

  Create an `.env` file and import it into `app.js` with the following:

   ```
   MONGODB_URI=your_mongodb_url
   ```

   Adjust the `PORT` value if needed.

4. Start the application:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000` (or the specified port).

## Usage

1. Register or log in to access the chat.
2. Navigate to the chat page.
3. Send and receive messages in real-time.

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token (JWT) implementation
- [express-session](https://www.npmjs.com/package/express-session) - Session middleware for Express
- [crypto](https://nodejs.org/api/crypto.html) - Node.js crypto module for cryptographic functionality

## Contributing

If you would like to contribute to this project, please follow the [contributing guidelines](CONTRIBUTING.md).


## Authors

- [@VicentCodes](https://www.github.com/VicentCodes)
- [@JoseCarHD](https://www.github.com/JoseCarHD)



## License

This project is licensed under the [MIT License](LICENSE).

