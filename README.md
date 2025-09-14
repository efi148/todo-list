# todo-list

## Table of Contents

- [server](#server)
  - [Installation](#installation)
  - [Endpoints](#endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## server

### Prerequisites
  - Node.js >= 16.14.0 (18 LTS or higher recommended)
  - npm >= 8

- ### Installation

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

- ### Basic Todo Structure
  Example of a typical Todo (API response):

```TypeScript
interface Todo {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}
```
- ### Endpoints

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

- ### Contributing

    Contributions are welcome! If you find any issues or have suggestions, feel free to open an issue or submit a pull request.

- ### License

    This project is licensed under the **[MIT License](https://opensource.org/license/mit/)**.
