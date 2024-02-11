import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class UserService {

  async checkFileType(file: Express.Multer.File) {
    if(file.mimetype != "image/jpeg" && file.mimetype != "image/png"){
      fs.unlink(file.path, (error) => {
        if (error) console.log(error);
      })
      throw new UnsupportedMediaTypeException("the image does not follow the PNG or JPEG standards")
    }
    return file.path;
  }

}
