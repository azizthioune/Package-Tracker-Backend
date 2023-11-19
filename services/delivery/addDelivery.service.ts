import { StatusCodes } from "http-status-codes";
import { Delivery, DeliveryStatus, IDelivery } from "../../models/Delivery";
import { failure, lean, success } from "../../utils";
import { generateCode } from "../../utils/generateCode";
import { Package } from "../../models/Package";
import { ObjectId } from "mongodb";

const addDelivery = async ({ package: packageID }: IDelivery) => {
  try {
    const foundPackage = await Package.findOne({
      _id: new ObjectId(packageID),
    });

    if (foundPackage) {
      const createdDelivery = await new Delivery({
        package: foundPackage._id,
        delivery_uid: `D-${await generateCode(8)}`,
        status: DeliveryStatus.Open,
      }).save();

      await Package.updateOne(
        { _id: foundPackage._id },
        { $addToSet: { deliveries: createdDelivery._id } }
      );

      return success(
        `Delivery successfully created.`,
        lean(createdDelivery),
        StatusCodes.CREATED
      );
    } else {
      return failure(StatusCodes.BAD_REQUEST, `Package not exist`, null);
    }
  } catch (error: any) {
    return failure(
      error?.code || StatusCodes.INTERNAL_SERVER_ERROR,
      error?.message,
      error?.error || error
    );
  }
};
export default addDelivery;
