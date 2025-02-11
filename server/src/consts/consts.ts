import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
    type: 'sqlite',  // Use SQLite as the database
    database: 'database.sqlite',  // SQLite database file
    autoLoadEntities: true,
    synchronize: true,  // Auto-create tables (only for development)
};