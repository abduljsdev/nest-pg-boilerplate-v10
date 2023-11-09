import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';

@Injectable()
export class FileUploadService {
  uploadToCloudinary(fileBuffer, fileType, resUrl = true) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: fileType }, (error, result) => {
          if (!error && result.url) {
            return resUrl ? resolve(result.url) : resolve(result);
          } else {
            return reject(error);
          }
        })
        .end(fileBuffer);
    });
  }
}
