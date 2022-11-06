import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
//import * as registerplayer from "./controller/register-player";
import userRoutes from "../routes/user";
import logging from "../config/logging";                       //LR

dotenv.config();
if (!process.env.PORT) 
{console.log(`Error to get ports`);
process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const uri: string = process.env.database!;  //can use any of this process.env.database || ''; or this //const BOT_PREFIX: string = `${process.env.PREFIX}`;
mongoose.connect(uri, (err: any) => {if (err) {console.log(err.message);
} else {
    console.log(`Connected to MONGO`);
}
});

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Welcome to national team football association page'));


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});




//new
const NAMESPACE = "server";
const router = express.Router();

//LR
router.use((req, res, net) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.
    socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.
        socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
});

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());

// API Rules
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "Origin, x-Requested-with, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }

    next();
});


//Err Handling
router.use((req, res, next) => {
    const error = new Error("not found");

    return res.status(404).json({
        message: error.message
    });
});