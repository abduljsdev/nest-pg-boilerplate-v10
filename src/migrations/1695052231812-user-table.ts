import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTable1695052231812 implements MigrationInterface {
  name = 'UserTable1695052231812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`image\` varchar(255) NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', \`passVerificationCode\` varchar(255) NULL, \`passExpiryTime\` varchar(255) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
