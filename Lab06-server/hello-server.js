// Import the 'http' module to create an HTTP server
const http = require('http');
// Create the server and define how it should handle incoming requests
const server = http.createServer((req, res) => {
    // Set the HTTP response headers
    // - Status code: 200 (OK)
    // - Content-Type: text/plain (plain text response)
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body and end the response
    res.end('Hello, World! Ulrich Project With Late submission');
});
// Start the server and listen for requests on port 3000
server.listen(3000, () => {
    // Log a message to the console when the server starts successfully
    console.log('Server is running on http://localhost:3000');
});