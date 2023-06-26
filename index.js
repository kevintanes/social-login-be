const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 2000;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1>TEMPLATE EXPRESS</h1>')
});

// ROUTING
const userRouter = require("./src/routers/userRouter");

app.use("/user", userRouter);


// ERROR-HANDLING
app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).send(err)
    }
})

app.listen(PORT, () => console.log(`Running API ${PORT}`));