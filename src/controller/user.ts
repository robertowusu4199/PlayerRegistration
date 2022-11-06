import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import User from "../model/user";
import signJWT from "../functions/signJWT";


const NAMESPACE = "User";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, "Token validation, user authorized");

    return res.status(200).json({
        message: "Authorized"
    });
};

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, email, password } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if (hashError)
        {
            return res.status(500).json({
                error: hashError
            })
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password: hash
        });


        return _user.save()
        .then(user => {
            return res.status(201).json({
                user
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
    })
}

const login = (req: Request, res: Response, next: NextFunction) => {
   let {username, password} = req.body;
   
   User.find({ username })
   .exec()
   .then(users => {
    if (users.length !== 1)
    {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error)
        {
            logging.error(NAMESPACE, error.message, error);

            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        else if (result)
        {
            signJWT(users[0], (_error, token) => {
                if(_error)
                {
                    logging.error(NAMESPACE, "Unable to sign token", _error);

                    return res.status(401).json({
                        message: "Unauthorized",
                        error: _error
                    });
                }
                else if(token)
                {
                    return res.status(200).json({
                        message: "Auth Successful",
                        token,
                        user: users[0]
                    });
                }
            });
        }
    });
   })
   .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const getAllusers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
    .select("-password")
    .exec()
    .then(users => {
        return res.status(200).json({
            users,
            count: users.length
        })
    })
    .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

export default { 
    validateToken, 
    register, 
    login, 
    getAllusers 
};