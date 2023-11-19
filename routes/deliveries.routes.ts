import { Router } from "express";
import { addDeliveryCtrl } from "../controllers/delivery/addDelivery.controller";
import { getDeliveriesCtrl } from "../controllers/delivery/fetchDeliveries.controller";
import { getDeliveryByIdCtrl } from "../controllers/delivery/fetchDelivery.controller";
import {
  updateDeliveryLocationCtrl,
  updateDeliveryStatusCtrl,
} from "../controllers/delivery/updateDelivery";

const router: Router = Router();

router.post("/", addDeliveryCtrl);
router.get("/", getDeliveriesCtrl);
router.get("/:id", getDeliveryByIdCtrl);
router.patch("/:id/update-status", updateDeliveryStatusCtrl);
router.patch("/:id/update-location", updateDeliveryLocationCtrl);

export default router;
