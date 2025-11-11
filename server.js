import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'


// initialize express app
const app = express();
// write port number in .env file
const PORT = process.env.PORT || 3000;









// // our first endpoint using express
app.get("/hello", (req, res)=> {
    res.json({
        message: "hello world",
        "status": "success"
    })
})

//start the server
app.listen(PORT, () => {
    console.log("server started on port", PORT);

})



export default app;