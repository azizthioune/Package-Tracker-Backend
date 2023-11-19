import { IPackage, Package } from "../../models/Package";
import { failure, lean, success } from "../../utils";
import { generateCode } from "../../utils/generateCode";
import { StatusCodes } from "http-status-codes";

const addPackage = async (payload: IPackage) => {
  try {
    const createdPackage = await new Package({
      ...payload,
      package_uid: `P-${await generateCode(8)}`,
    }).save();

    return success(
      `Package successfully created.`,
      lean(createdPackage),
      StatusCodes.CREATED
    );
  } catch (error: any) {
    return failure(
      error?.code || StatusCodes.INTERNAL_SERVER_ERROR,
      error?.message,
      error?.error || error
    );
  }
};
export default addPackage;
