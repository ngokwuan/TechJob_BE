import { City } from '../models/city.model';

export const getAllCities = async () => {
  return await City.find({})
    .collation({ locale: 'vi', strength: 1 })
    .sort({ cityName: 1 });
};

export const getCityById = async (id: string) => {
  const city = await City.findById(id);
  if (!city) return null;
  return city;
};
