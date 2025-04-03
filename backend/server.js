import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js"
import cookieParser from "cookie-parser";
import fs from "node:fs";



dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

//MIDDLEWARE
app.use(
    cors({
        origin:process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//ROUTES
//return an array of all the files we have in routes
const routeFiles = fs.readdirSync("./src/routes");
console.log(routeFiles);

routeFiles.forEach((files) => {
    //using dynamic import
    import(`./src/routes/${file}`).then((route)=>{
        app.use("/api/v1", route.default);
    })
    .catch((err) =>{
        console.log("Failed to load route file", err);
    });
});

const server = async () =>{
    try{
        await connect(); //connect to MONGODB database cluster before running on port
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })

    }
    catch(error){
        console.log("failed to start server.....", error.message);
        //clearnup
        exit.process(1);
    }
};

server();