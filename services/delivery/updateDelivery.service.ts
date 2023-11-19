import { Delivery, DeliveryStatus } from "../../models/Delivery";
import { ObjectId } from "mongodb";
import { ILocation } from "../../models/Package";
import { ID } from "./fetchDeliveryById.service";
import { success } from "../../utils";

const updateDeliveryStatus = async (id: ID, status: DeliveryStatus) => {
  let timeToUpdate = {};
  if (status === DeliveryStatus.PickedUp) {
    timeToUpdate = {
      pickup_time: new Date(),
    };
  }
  if (status === DeliveryStatus.InTransit) {
    timeToUpdate = {
      start_time: new Date(),
    };
  }
  if (status === DeliveryStatus.Delivered || status === DeliveryStatus.Failed) {
    timeToUpdate = {
      end_time: new Date(),
    };
  }

  const result = await Delivery.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      ...timeToUpdate,
      status: status,
      last_edited_at: new Date(),
    },
    { new: true }
  );

  return success("Delivery successfully updated.", result);
};

const updateDeliveryLocation = async (id: ID, location: ILocation) => {
  const result = await Delivery.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      location,
      last_edited_at: new Date(),
    },
    { new: true }
  );

  return success("Delivery successfully updated.", result);
};

export { updateDeliveryStatus, updateDeliveryLocation };
