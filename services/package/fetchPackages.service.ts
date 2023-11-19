import { StatusCodes } from "http-status-codes";
import { Package } from "../../models/Package";

const getPackages = async ({ name }: { name?: string }) => {
  try {
    const query = {
      isDeleted: false,
      ...(name && {
        $or: [{ from_name: name }, { to_name: name }],
      }),
    };

    const packages = await Package.find(query)
      .populate({
        path: "deliveries",
      })
      .lean();

    const count = await Package.countDocuments(query);

    return {
      error: null,
      code: StatusCodes.OK,
      message: "Packages successfully retrieved.",
      data: packages,
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

export { getPackages };
