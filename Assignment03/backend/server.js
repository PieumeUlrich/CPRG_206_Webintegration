import express from "express";
import cors from "cors";


import dashboard from "./routes/dashboard.js";
import bookings from "./routes/bookings.js";
import customers from "./routes/customer.js";
import query from "./routes/query.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboard);
app.use("/api/booking", bookings);
app.use("/api/customer", customers);
app.use("/api/query", query);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const app = express();
// app.use(cors());

// const config = { 
//     user: 'ulrich',
//     password: 'root',
//     server: 'MSI',
//     database: 'TravelAgency',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//         trustedConnection: false,
//         enableArithAbort: true,
//         instancename: 'SQLEXPRESS'
//     },
//     port: 1433
// };

// app.get('/', (req, res) => {
//     res.status(200).send("Hi, this is your Ulrich\nAdd more information in another line.\nAnd more!");
// });



// app.get('/api/bookings', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request().query(
//             `SELECT DISTINCT TOP (4)
//                 B.BOOKINGID, 
//                 C.FIRSTNAME + ' ' + C.LASTNAME AS CUSTOMER_NAME, 
//                 B.DESTINATIONID, 
//                 D.DESTDESCRIPTION,
//                 B.BOOKINGDATE,
//                 B.BASEPRICE
//              FROM ULRICH.BOOKING B 
//              JOIN ULRICH.DESTINATION D ON B.DESTINATIONID = D.DESTINATIONID 
//              JOIN ULRICH.CUSTOMER C ON B.CUSTOMERID = C.CUSTOMERID;`
//         );
//         res.json({data: result.recordset});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching bookings');
//     } finally {
//         sql.close();
//     }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
// });
