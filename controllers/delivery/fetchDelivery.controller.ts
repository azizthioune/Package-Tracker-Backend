import { Response, Request, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";
import getDeliveryById from "../../services/delivery/fetchDeliveryById.service";

export const getDeliveryByIdCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as unknown as {
      id: string;
    };

    const { error, code, message, data } = await getDeliveryById({ id });

    return res.status(code).json({
      error,
      code,
      message,
      data,
    });
  } catch (error: any) {
    next({
      error: error.stack,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    });
  }
};
