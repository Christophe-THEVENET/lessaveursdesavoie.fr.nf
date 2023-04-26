<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230424124618 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'add table formula_meal, and modif booking, dish, formula ';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE formula_meal (formula_id INT NOT NULL, meal_id INT NOT NULL, INDEX IDX_4EF9322FA50A6386 (formula_id), INDEX IDX_4EF9322F639666D6 (meal_id), PRIMARY KEY(formula_id, meal_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322FA50A6386 FOREIGN KEY (formula_id) REFERENCES formula (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322F639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE category');
        $this->addSql('ALTER TABLE booking ADD allergy LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
        $this->addSql('ALTER TABLE dish DROP FOREIGN KEY FK_957D8CB812469DE2');
        $this->addSql('DROP INDEX IDX_957D8CB812469DE2 ON dish');
        $this->addSql('ALTER TABLE dish CHANGE category_id met_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE dish ADD CONSTRAINT FK_957D8CB82CFE2A2D FOREIGN KEY (met_category_id) REFERENCES met_category (id)');
        $this->addSql('CREATE INDEX IDX_957D8CB82CFE2A2D ON dish (met_category_id)');
        $this->addSql('ALTER TABLE formula DROP FOREIGN KEY FK_673158813256915B');
        $this->addSql('DROP INDEX IDX_673158813256915B ON formula');
        $this->addSql('ALTER TABLE formula DROP relation_id');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322FA50A6386');
        $this->addSql('ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322F639666D6');
        $this->addSql('DROP TABLE formula_meal');
        $this->addSql('ALTER TABLE booking DROP allergy');
        $this->addSql('ALTER TABLE dish DROP FOREIGN KEY FK_957D8CB82CFE2A2D');
        $this->addSql('DROP INDEX IDX_957D8CB82CFE2A2D ON dish');
        $this->addSql('ALTER TABLE dish CHANGE met_category_id category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE dish ADD CONSTRAINT FK_957D8CB812469DE2 FOREIGN KEY (category_id) REFERENCES met_category (id)');
        $this->addSql('CREATE INDEX IDX_957D8CB812469DE2 ON dish (category_id)');
        $this->addSql('ALTER TABLE formula ADD relation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE formula ADD CONSTRAINT FK_673158813256915B FOREIGN KEY (relation_id) REFERENCES meal (id)');
        $this->addSql('CREATE INDEX IDX_673158813256915B ON formula (relation_id)');
        $this->addSql('ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`');
    }
}
