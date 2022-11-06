import { json } from "body-parser";
import { Request, Response } from "express";
import Player from '../model/register-player';

export const allPlayers = (req: Request, res: Response) => {
  const player = Player.find((err: any, product: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(player);
    }
  });
};

export const getPlayer = (req: Request, res: Response) => {
  const player = Player.findById(req.params.id, (err: any, player: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(player);
    }
  });
};

export const addPlayer = (req: Request, res: Response) => {
  const player = new Player(req.body);

  player.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(player);
    }
  });
};

export const updatePlayer = (req: Request, res: Response) => {
  console.log(req.body);
  const player = Player.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, player: any) => {
      if (err) {
        res.status(500).json(err.message);
      } else {
        res.status(201).json({player, message: "Successfully updated player info!"});
      }
    }
  );
};

export const deletePlayer = (req: Request, res: Response) => {
  const player = Player.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Successfully Deleted Player");
    }
  });
};

export default { 
  allPlayers, 
  getPlayer, 
  addPlayer, 
  updatePlayer,
  deletePlayer
};