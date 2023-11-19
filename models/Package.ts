import { Document, Schema, model, Types } from "mongoose";

type ID = Types.ObjectId;

export interface ILocation {
  latitude?: number;
  longitude?: number;
}

export interface IPackage {
  package_uid?: string;
  deliveries?: ID[];
  description?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  from_name?: string;
  to_name?: string;
  from_address?: string;
  to_address?: string;
  from_location?: ILocation;
  to_location?: ILocation;
}

export interface IPackageDoc extends IPackage, Document {}

const PackageSchema = new Schema(
  {
    package_uid: {
      type: Schema.Types.String,
      required: true,
    },
    deliveries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Delivery",
        default: [],
      },
    ],
    description: {
      type: Schema.Types.String,
      required: true,
      minlength: 3,
    },
    weight: {
      type: Schema.Types.Number,
      default: 0,
    },
    width: {
      type: Schema.Types.Number,
      default: 0,
    },
    height: {
      type: Schema.Types.Number,
      default: 0,
    },
    depth: {
      type: Schema.Types.Number,
      default: 0,
    },
    from_name: {
      type: Schema.Types.String,
      default: null,
    },
    from_address: {
      type: Schema.Types.String,
      default: null,
    },
    from_location: {
      latitude: {
        type: Schema.Types.Number,
        default: null,
      },
      longitude: {
        type: Schema.Types.Number,
        default: null,
      },
    },
    to_name: {
      type: Schema.Types.String,
      default: null,
    },
    to_address: {
      type: Schema.Types.String,
      default: null,
    },
    to_location: {
      latitude: {
        type: Schema.Types.Number,
      },
      longitude: {
        type: Schema.Types.Number,
      },
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
    collection: "packages",
  }
);

PackageSchema.index({ created_at: -1 });

export const Package = model<IPackageDoc>("Package", PackageSchema);
