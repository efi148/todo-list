import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  defaultData = `
<style>
   body {
            font-family: Calibri, sans-serif;
            margin: 40px;
            background-color: #f4f4f4;
        }
        
        h1 {
            font-family: Arial, sans-serif;
            color: #4c4c4c;
        }
        
        h2 {
            font-family: Arial, sans-serif;
            color: #333;
        }
        
        .endpoint {
            background: #fff;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 10px;
        }
        
        .method {
            font-weight: bold;
            font-size: 13px;
            color: #007BFF;
        }
        
        .description {
            margin-top: 5px;
        }
</style>
 
    <h1>Todo App Server</h1>
    
    <h2>API Endpoints</h2>

    <div class="endpoint">
        <span class="method">GET</span> <code>/todos</code>
        <p class="description">Fetches all todos.</p>
    </div>

    <div class="endpoint">
        <span class="method">GET</span> <code>/todos/:id</code>
        <p class="description">Fetches a specific to-do by ID.</p>
    </div>

    <div class="endpoint">
        <span class="method">POST</span> <code>/todos</code>
        <p class="description">Create a new to-do. Requires a JSON payload in the request body:</p>
        <pre>{ "title": "string", "description": "string" }</pre>
    </div>

    <div class="endpoint">
        <span class="method">PATCH</span> <code>/todos/:id</code>
        <p class="description">Updates a specific to-do by ID. Requires a JSON payload in the request body:</p>
        <pre>{ "title": "string (optional)", "description": "string (optional)", "checked": "boolean (optional)" }</pre>
    </div>

    <div class="endpoint">
        <span class="method">DELETE</span> <code>/todos/:id</code>
        <p class="description">Delete a specific to-do by ID.</p>
    </div>
`

  getDefaultRoute(): string {
    return this.defaultData;
  }
}
