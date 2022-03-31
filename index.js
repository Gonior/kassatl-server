const app = require('./app')
const PORT = process.env.PORT || 8000
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const https = require('https');
const server = https.createServer({key: key, cert: cert }, app);

//on development
//app.listen(PORT, () => {
//       console.log(`Server running on port : ${PORT}`)    
//})
server.listen(PORT, '0.0.0.0', () => {
     console.log(`Server running on port : ${PORT}`)
})
