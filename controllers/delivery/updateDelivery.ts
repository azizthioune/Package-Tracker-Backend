import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  updateDeliveryLocation,
  updateDeliveryStatus,
} from "../../services/delivery/updateDelivery.service";
import { ID } from "../../services/delivery/fetchDeliveryById.service";

const updateDeliveryStatusCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = (<unknown>req.params) as { id: ID };
    const { status } = req.body;
    const { error, code, message, data } = await updateDeliveryStatus(
      id,
      status
    );
    return res.status(code).json({ error, code, message, data });
  } catch (error: any) {
    next({
      error: error?.stack,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      data: null as any,
    });
  }
};

export { updateDeliveryStatusCtrl };

const updateDeliveryLocationCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = (<unknown>req.params) as { id: ID };
    const { location } = req.body;
    const { error, code, message, data } = await updateDeliveryLocation(
      id,
      location
    );
    return res.status(code).json({ error, code, message, data });
  } catch (error: any) {
    next({
      error: error?.stack,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error?.message,
      data: null as any,
    });
  }
};

export { updateDeliveryLocationCtrl };
