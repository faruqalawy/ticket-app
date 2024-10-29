import express from "express";

import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  respondToTicket,
  deleteTicket,
} from "../controllers/ticketController.js";
import { ensureAuthenticated } from "../middlewares/authMiddleware.js";
import { isAdmin, isClient } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", ensureAuthenticated, isClient, createTicket);
router.get("/", ensureAuthenticated, getAllTickets);
router.get("/:id", ensureAuthenticated, getTicketById);
router.put("/:id", ensureAuthenticated, updateTicket);
router.post("/:id/respond", ensureAuthenticated, isAdmin, respondToTicket);
router.delete("/:id", ensureAuthenticated, isAdmin, deleteTicket);

export default router;