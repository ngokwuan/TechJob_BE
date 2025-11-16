import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
  cityName: string;
}

const CitySchema: Schema<ICity> = new Schema(
  {
    cityName: { type: String, required: true },
  },
  { timestamps: false }
);

export const City = mongoose.model<ICity>('City', CitySchema, 'city');
