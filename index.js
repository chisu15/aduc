const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const route = require("./routes/index.route");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
route(app);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
