<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230425091444 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'modif type of allergy in booking';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking CHANGE allergy allergy VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking CHANGE allergy allergy LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\'');
    }
}
