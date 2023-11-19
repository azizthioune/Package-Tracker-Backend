import { StatusCodes } from "http-status-codes";
import { Delivery } from "../../models/Delivery";

const getDeliveries = async () => {
  try {
    const deliveries = await Delivery.find()
      .populate({
        path: "package",
      })
      .lean();

    const count = await Delivery.countDocuments();

    return {
      error: null,
      code: StatusCodes.OK,
      message: "Deliveries successfully retrieved.",
      data: deliveries,
      countTotal: count,
    };
  } catch (error: any) {
    return {
      error: error.stack,
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
      countTotal: 0,
    };
  }
};

export { getDeliveries };
