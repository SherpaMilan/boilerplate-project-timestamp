// index.js

// where your node app starts
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  // Extract date parameter from request URL
  const dateParam = req.params.date;

  // If date parameter is empty, use current time
  let inputDate;
  if (!dateParam) {
    inputDate = new Date();
  } else {
    // Attempt to parse the date parameter as a Unix timestamp or date string
    inputDate = new Date(isNaN(dateParam) ? dateParam : parseInt(dateParam));
  }

  // Check if the input date is valid
  if (isNaN(inputDate.getTime())) {
    // Handle invalid date
    return res.json({ error: "Invalid Date, try again" });
  }

  // Generate response JSON object
  return res.json({ unix: inputDate.getTime(), utc: inputDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
