// db/config.js
const config = {
  user: "ulrich",
  password: "root",
  server: "MSI",
  database: "TravelAgency",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

export default config;