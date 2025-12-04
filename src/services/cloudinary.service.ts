import cloudinary from '../config/cloudinary';

export const uploadImage = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  const result: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(file.buffer);
  });

  return result.secure_url;
};

export const uploadImages = async (
  files: Express.Multer.File[],
  folder: string
): Promise<string[]> => {
  const urls: string[] = [];
  if (!files || files.length === 0) return urls;

  for (const file of files) {
    const url = await uploadImage(file, folder);
    urls.push(url);
  }
  return urls;
};
export const uploadCV = (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'cv',
        resource_type: 'raw',
        public_id: file.originalname.split('.')[0],
        format: 'pdf',
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload CV thất bại'));
        }
        resolve(result.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};
