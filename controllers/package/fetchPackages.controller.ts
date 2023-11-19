import { Request, Response, NextFunction } from "express";
import { getPackages } from "../../services/package/fetchPackages.service";
import { StatusCodes } from "http-status-codes";

export const getPackagesCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query as unknown as { name?: string };

    const { error, code, message, data, countTotal } = await getPackages({
      name,
    });
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
