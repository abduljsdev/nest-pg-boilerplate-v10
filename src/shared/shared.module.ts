import { EmailService } from './email.service';
import { Module, Global } from '@nestjs/common';
import { FileUploadService } from './uploadFile.service';

@Global()
@Module({
  providers: [EmailService, FileUploadService],
  exports: [EmailService, FileUploadService],
})
export class SharedModule {}
