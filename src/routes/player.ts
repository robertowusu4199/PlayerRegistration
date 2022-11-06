import express from "express";
import controller from  "../controller/register-player";

const router = express.Router();

//router.use("/players", userRoutes),

router.get("/players", controller.allPlayers);
router.get("/player/:id", controller.getPlayer);
router.post("/addplayer", controller.addPlayer);
router.put("/updateplayer/:id", controller.updatePlayer);
router.delete("/deleteplayer/:id", controller.deletePlayer);

export = router;