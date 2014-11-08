Basic Development Setup:<br>
1. Install Node.js: http://nodejs.org/download/<br>
2. Install MongoDB: http://www.mongodb.org/downloads<br>
3. Fork the repo<br>
4. Now cd to ./server and type: npm install<br>
    - This installs the servers dependencies.<br>
5. Open a new terminal and type: mongod<br>
    - This starts the MongoDB server.<br>
6. In the original terminal type: node server.js<br>
    - This starts the application server.<br>
7. Open a browser and navigate to http://localhost:8080/#/<br>
    - You should see the view defined in ./client/views/home.html<br>