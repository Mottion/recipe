import { Injectable } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class UserService {

  async checkFileType(file: Express.Multer.File) {
    if(file.mimetype != "image/jpeg" && file.mimetype != "image/png"){
      fs.unlink(file.path, (error) => {
        console.log(error);
      })
    }
  }

}
