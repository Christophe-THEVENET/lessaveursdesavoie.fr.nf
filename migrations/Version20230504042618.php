<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504042618 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'delete nullable from opening_hours';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opening_hours CHANGE lunch_start_hour lunch_start_hour TIME NOT NULL, CHANGE lunch_end_hour lunch_end_hour TIME NOT NULL, CHANGE dinner_start_hour dinner_start_hour TIME NOT NULL, CHANGE dinner_end_hour dinner_end_hour TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE opening_hours CHANGE lunch_start_hour lunch_start_hour TIME DEFAULT NULL, CHANGE lunch_end_hour lunch_end_hour TIME DEFAULT NULL, CHANGE dinner_start_hour dinner_start_hour TIME DEFAULT NULL, CHANGE dinner_end_hour dinner_end_hour TIME DEFAULT NULL');
    }
}
