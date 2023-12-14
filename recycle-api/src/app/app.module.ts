import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { PartnersModule } from 'src/partners/partners.module';
import { MaterialsModule } from 'src/materials/materials.module';
import { CitiesModule } from 'src/cities/cities.module';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PartnersModule,
    MaterialsModule,
    CitiesModule,
    RequestsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
