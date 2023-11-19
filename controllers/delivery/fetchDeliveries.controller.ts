import { Request, Response, NextFunction } from "express";
import { getDeliveries } from "../../services/delivery/fetchDeliveries.service";
import { StatusCodes } from "http-status-codes";

export const getDeliveriesCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, code, message, data, countTotal } = await getDeliveries();
    return res.status(code).json({
      error,
      code,
      message,
      countTotal,
      data,
    });
  } catch (error: any) {
    next({
      error: error.stack,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null as any,
    });
  }
};
