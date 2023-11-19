import { StatusCodes } from "http-status-codes";
import { failure, success } from "../../utils";
import { Types } from "mongoose";
import { Delivery } from "../../models/Delivery";

export type ID = Types.ObjectId;

const getDeliveryById = async ({ id }: { id: string }) => {
  try {
    const fetchedDelivery = await Delivery.findOne({
      delivery_uid: id,
    })
      .populate({
        path: "package",
      })
      .lean();

    return success(
      "Package Retrieved successfully.",
      fetchedDelivery,
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

export default getDeliveryById;
