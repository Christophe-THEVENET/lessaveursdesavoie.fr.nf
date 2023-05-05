<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504135453 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'add entry, dish, dessert, image_name, image_size, updated_at, price to meal';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE meal ADD entry VARCHAR(255) DEFAULT NULL, ADD dish VARCHAR(255) DEFAULT NULL, ADD dessert VARCHAR(255) DEFAULT NULL, ADD image_name VARCHAR(255) DEFAULT NULL, ADD image_size INT DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD price DOUBLE PRECISION DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE meal DROP entry, DROP dish, DROP dessert, DROP image_name, DROP image_size, DROP updated_at, DROP price');
    }
}
