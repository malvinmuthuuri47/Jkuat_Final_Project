# A web-based student grading system

> **This project aims to show how to protect a website from NoSQL injection**

## The technologies used in this project are:
- React (frontend)
- Node Js (backend)

## Features
- User registration and authentication
- User authorization (Role-based access control)
- Json web tokens and cookies to protect specific routes
- Context API to manage the global authentication state
- NoSQL injection protection using mongo-sanitize

## Installation
To set up this project locally, follow the following steps:

1. Clone the repository:
    ```
    git clone <repo-url>
    cd Version_5
    ```

2. Run the following command to install the necessary packages:
    ```
    cd Version_5/backend
    npm install

    cd Version_5/frontend
    npm install
    ```

3. After all the packages are installed, run the following commands:
    ```
    cd Version_5/backend
    npm run dev

    cd Version_5/frontend
    npm run start
    ```

4. After the two servers start, you will see an open tab in your default browser which you can now use to interact with the backend.

## License
This project is licensed under the MIT license. See the [License](LICENSE) file for more details
