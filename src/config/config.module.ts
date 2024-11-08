import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { EnvironmentService } from './environment/environment.service';
@Module({
  imports: [EnvironmentModule],
  providers: [EnvironmentService],
})
export class ConfigModule {}
