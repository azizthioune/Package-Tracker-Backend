import { Response, Request, NextFunction } from "express";
import getPackageById, {
  ID,
} from "../../services/package/fetchPackageById.service";
import { StatusCodes } from "http-status-codes";

export const getPackageCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params as unknown as {
      id: string;
    };

    const { error, code, message, data } = await getPackageById({ id });

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
