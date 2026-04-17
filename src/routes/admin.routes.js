import express from "express";
import {
  getPendingAgents,
  approveAgent
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/agents/pending", protect, isAdmin, getPendingAgents);
router.put("/agents/:id/approve", protect, isAdmin, approveAgent);

export default router;
