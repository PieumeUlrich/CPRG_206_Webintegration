
// The video from this link was really helpful in understanding how to connect to SQL Server using Node.js
// https://www.youtube.com/watch?v=zvvqUsvB540
const sql = require('msnodesqlv8');

const connectionString = "server=MSI;Database=TravelAgency;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
const query= 'SELECT * FROM ULRICH.Customer';

async function connectToDatabase(localQuery) {
    try {
        const pool = await sql.query(connectionString, localQuery, (err, rows) => {
            if (err) {
                console.error('Error executing query:', err);
            } else {
                console.log('Query results:', rows);
            }
        });
        pool.close();
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

export default connectToDatabase;