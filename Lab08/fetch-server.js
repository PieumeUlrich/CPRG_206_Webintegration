// Import required libraries
const express = require('express'); // Web framework for building the server and handling HTTP requests
const sql = require('msnodesqlv8'); // Library for connecting to SQL Server databases

// Define the connection string for the SQL Server database
const connectionString = "server=MSI;Database=DemoDB;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
// Initialize the Express application
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

function connectToDatabase(query) {
    return new Promise((resolve, reject) => {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


app.get('/users', async (req, res) => {
    getCustomersQuery = 'SELECT * FROM dbo.Users';
    try {
        // Connect to the database and execute the query to fetch all users
        const pool = await connectToDatabase(getCustomersQuery);
        //Send the query result as a JSON response
        res.json(pool);
    } catch (err) {
        // Handle errors and send an appropriate response
        res.status(500).send(err.message);
    }
});

app.post('/query', async (req, res) => {
    const userQuery = req.body.query;

    try {
        const rows = await connectToDatabase(userQuery);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
