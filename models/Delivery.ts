import { Document, Schema, model, Types } from "mongoose";
import { ILocation } from "./Package";

export interface IDelivery {
  delivery_uid?: string;
  package?: string;
  pickup_time?: string;
  start_time?: string;
  end_time?: string;
  location?: ILocation;
  status?: number;
}

export enum DeliveryStatus {
  Open = "OPEN",
  PickedUp = "PICKEDUP",
  InTransit = "INTRANSIT",
  Delivered = "DELIVERED",
  Failed = "FAILED",
}

export interface IDeliveryDoc extends IDelivery, Document {}

const DeliverySchema = new Schema(
  {
    delivery_uid: {
      type: Schema.Types.String,
      required: true,
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: [true, "You have to set a a package fot the delivery."],
    },
    pickup_time: {
      type: Schema.Types.Date,
    },
    start_time: {
      type: Schema.Types.Date,
    },
    end_time: {
      type: Schema.Types.Date,
    },
    location: {
      latitude: {
        type: Schema.Types.Number,
      },
      longitude: {
        type: Schema.Types.Number,
      },
    },
    status: {
      type: Schema.Types.String,
      enum: Object.values(DeliveryStatus),
      required: [true, "You have to set a delivery status."],
    },
    created_at: {
      type: Schema.Types.Date,
      default: Date.now,
    },
    last_edited_at: {
      type: Schema.Types.Date,
      default: Date.now,
    },
  },
  {
    collection: "deliveries",
  }
);

DeliverySchema.index({ created_at: -1 });

export const Delivery = model<IDeliveryDoc>("Delivery", DeliverySchema);
