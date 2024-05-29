# Realtime Chat App

## Overview

Welcome to the Realtime Chat App! This application enables users to log in and chat with their friends in real-time using Appwrite's Realtime services. The app supports user authentication, adding friends, and instant messaging. The primary technologies used in this project include Appwrite for backend services and a modern frontend framework React

## Features

- **User Authentication**: Secure login and registration system.
- **Realtime Messaging**: Instant messaging with friends.


## Tech Stack

- **Frontend**: React
- **Backend**: Appwrite
- **Database**: Appwrite's built-in database
- **Authentication**: Appwrite Authentication
- **Realtime Services**: Appwrite Realtime

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- npm installed
- Appwrite server set up and running
- Appwrite project created with the necessary collections and attributes
- Appwrite SDK installed in your project

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/realtime-chat-app.git
    cd realtime-chat-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Configure the environment variables**:
   Create a `.env` file in the root directory and add the following:
    ```env
    REACT_APP_APPWRITE_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]
    REACT_APP_APPWRITE_PROJECT=[YOUR_APPWRITE_PROJECT_ID]
    ```

4. **Start the development server**:
    ```bash
    npm start
    ```

### Setting Up Appwrite

1. **Create a new project** in Appwrite.
2. **Set up Authentication**:
    - Enable email/password authentication.
3. **Create a database**:
    - Add a collection for users, messages, and friends.
    - Define appropriate attributes for each collection (e.g., userId, messageText, friendId).
4. **Enable Realtime**:
    - Configure realtime channels for messages and user statuses.

## Usage

**Register or Log in**:
    - New users can register, and existing users can log in using their email and password.


## Project Structure

```plaintext
realtime-chat-app/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── README.md
```

- **components/**: Reusable UI components
- **pages/**: Different pages of the application (e.g., Login, Register, Chat)
- **services/**: Interaction with Appwrite (e.g., authentication, database operations)

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.


## Contact

If you have any questions or need further assistance, feel free to contact us at 
nick1512007@gmail.com

Enjoy chatting with your friends in real-time!