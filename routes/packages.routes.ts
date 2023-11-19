import { Router } from "express";
import { addPackageCtrl } from "../controllers/package/addPackage.controller";
import { getPackagesCtrl } from "../controllers/package/fetchPackages.controller";
import { getPackageCtrl } from "../controllers/package/fetchPackage.controller";

const router: Router = Router();

router.post("/", addPackageCtrl);
router.get("/", getPackagesCtrl);
router.get("/:id", getPackageCtrl);

export default router;
