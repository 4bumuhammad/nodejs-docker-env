
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

    [+] Building 2.8s (10/10) FINISHED                                                                                                                                                                              
    => [internal] load build definition from Dockerfile                                                                              0.0s
    => => transferring dockerfile: 37B                                                                                               0.0s
    => [internal] load .dockerignore                                                                                                 0.0s
    => => transferring context: 2B                                                                                                   0.0s
    => [internal] load metadata for docker.io/library/node:14.17.3                                                                   2.7s
    => [1/5] FROM docker.io/library/node:14.17.3@sha256:976c9107158a1c85ab0702aec5b1d56bbb85de493ca50794e545a0271421e028             0.0s
    => [internal] load build context                                                                                                 0.0s
    => => transferring context: 896B                                                                                                 0.0s
    => CACHED [2/5] WORKDIR /app                                                                                                     0.0s
    => CACHED [3/5] COPY package*.json /app/                                                                                         0.0s
    => CACHED [4/5] RUN npm install                                                                                                  0.0s
    => [5/5] COPY . /app/                                                                                                            0.0s
    => exporting to image                                                                                                            0.0s
    => => exporting layers                                                                                                           0.0s
    => => writing image sha256:097b9a7f5d4dfe8845a762ebaeecd640625856de1fb8b4b988e608f5f00174e2                                      0.0s
    => => naming to docker.io/library/nodejs-docker-env                                                                              0.0s

    Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them


❯ docker images
    REPOSITORY          TAG       IMAGE ID       CREATED          SIZE
    nodejs-docker-env   latest    097b9a7f5d4d   11 seconds ago   891MB
</pre>

### 9. Run the Docker Container
<pre>
❯ docker run --name nodejs-env-container -p 3011:3011 --env-file .env nodejs-docker-env
</pre>

### 10. Verify Output
<pre>
    > project@1.0.0 start /app
    > node index.js

    Hello, Dhony Abu Muhammad!
    Server is supposed to run on port 3011
    Server running at http://localhost:3011/
</pre>

&nbsp;

&nbsp;

&nbsp;

&nbsp;

