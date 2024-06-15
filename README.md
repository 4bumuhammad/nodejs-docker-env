
# Deploying Node.js Applications with Docker and Environment Variables

&nbsp;

Here are the steps to create a simple Node.js project that can be built into a Docker image and run using environment variables from the .env file.

### 1. Create a Project Structure
<pre>
❯ mkdir project && cd project
</pre>

### 2. Initialize the Node.js Project
<pre>
❯ nvm use v14.17.3
    Now using node v14.17.3 (npm v6.14.13)

❯ node --version
    v14.17.3

❯ npm init -y
</pre>

### 3. Install Dependencies
<pre>
❯ npm install dotenv
</pre>

### 4. Create `.env` file
<pre>
❯ vim .env
    . . .
    PORT=3011
    GREETING=Hello
    TARGET=Dhony Abu Muhammad
</pre>

### 5. Create index.js file
<pre>
❯ vim index.js
    . . .
    require('dotenv').config();

    const port = process.env.PORT || 3000;
    const greeting = process.env.GREETING || 'Hello';
    const target = process.env.TARGET || 'World';

    console.log(`${greeting}, ${target}!`);
    console.log(`Server is supposed to run on port ${port}`);

    // Keep the container running
    const http = require('http');
    const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Server is running\n');
    });

    server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    });
</pre>

### 6. Create package.json file
<pre>
❯ vim package.json
    {
      "name": "project",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "node index.js"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        "dotenv": "^16.4.5"
      }
    }
</pre>

### 7. Create Dockerfile file
<pre>
❯ vim Dockerfile
    # Dockerfile
    FROM node:14.17.3
    WORKDIR /app
    COPY package*.json /app/
    RUN npm install
    COPY . /app/
    EXPOSE ${PORT}
    CMD ["npm", "start"]
</pre>

### 8. Build Docker Image
<pre>
❯ docker build -t nodejs-docker-env .
</pre>

### 9. Run the Docker Container
<pre>
❯ docker run --name nodejs-env-container -p 3011:3011 --env-file .env nodejs-docker-env
</pre>

### 10. Verify Output
<pre>
</pre>

&nbsp;

&nbsp;

&nbsp;

&nbsp;

