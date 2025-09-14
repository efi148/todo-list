# todo-list

## Table of Contents

- [server](#server)
  - [Prerequisites](#prerequisites)
  - [Installation](#server-installation)
  - [Endpoints](#endpoints)

- [client](#client)
  - [Installation](#client-installation)
  - [Available Scripts](#available-scripts)

- [Contributing](#contributing)
- [License](#license)

## server

### Prerequisites
  - Node.js >= 16.14.0 (18 LTS or higher recommended)
  - npm >= 8

<h3 id="server-installation">Installation</h3>

    1. Clone the repository:

        ```bash
        git clone https://github.com/your-username/todo-api.git
        ```

    2. Install the dependencies:

        ```bash
        cd todo-list/server
        npm install
        ```

    3. Start the development server:

        ```bash
        npm run start:dev
        ```

    The API will be available at <http://localhost:3000>.

### Basic Todo Structure
  Example of a typical Todo (API response):

```TypeScript
interface Todo {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}
```
### Endpoints

  - ```http request
    GET /todos
    ```

    Fetches all todos.

  - ```http request
    GET /todos/:id
    ```

    Fetches a specific to-do by ID.

  - ```http request
    POST /todos
    ```

    Create a new to-do. Requires a JSON payload in the request body with the following properties:
    `title (string).
    description (string).`

  - ```http request
    PATCH /todos/:id
    ```

    Updates a specific todo by ID. Requires a JSON payload in the request body with the properties you want to update:
    `title (string, optional).
    description (string, optional).
    checked (boolean, optional).`

  - ```http request
    DELETE /todos/:id
    ```

    Delete a specific to-do by ID.

## client

<h3 id="client-installation">Installation</h3>

  1. Navigate to the client folder:

      ```bash
     cd todo-list/client
     npm install
      ```

  2. Start the development server:

      ```bash
      npm start
      ```

  The App will be available at <http://localhost:4201>.

<h3 id="available-scripts">Available Scripts</h3>


  - `npm start` –Runs the app in development mode on [http://localhost:4201](http://localhost:4201) and opens it in the browser.

  - `npm run build` –Builds the app for production to the `dist/` folder.

  - `npm run watch` –Builds the app in development mode and rebuilds on file changes.

  - `npm test` –Launches the unit test runner.

## Contributing

Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the **[MIT License](https://opensource.org/license/mit/)**.
