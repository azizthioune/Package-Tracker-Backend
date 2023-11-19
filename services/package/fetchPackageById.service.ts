import { StatusCodes } from "http-status-codes";
import { Package } from "../../models/Package";
import { failure, success } from "../../utils";
import { Types } from "mongoose";

export type ID = Types.ObjectId;

const getPackageById = async ({ id }: { id: string }) => {
  try {
    const fetchedPackage = await Package.findOne({
      package_uid: id,
    }).populate({
      path: "deliveries",
    });

    return success(
      "Package Retrieved successfully.",
      fetchedPackage,
      StatusCodes.OK
    );
  } catch (error: any) {
    return failure(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
      error.stack
    );
  }
};

export default getPackageById;
