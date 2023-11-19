import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import addPackage from "../../services/package/addPackage.service";

export const addPackageCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload } = req.body;
    const { error, code, message, data } = await addPackage(payload);
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
