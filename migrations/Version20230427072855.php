<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230427072855 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'change relation between formula and meal';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322F639666D6');
        $this->addSql('ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322FA50A6386');
        $this->addSql('DROP TABLE formula_meal');
        $this->addSql('ALTER TABLE formula ADD meal_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE formula ADD CONSTRAINT FK_67315881639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id)');
        $this->addSql('CREATE INDEX IDX_67315881639666D6 ON formula (meal_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE formula_meal (formula_id INT NOT NULL, meal_id INT NOT NULL, INDEX IDX_4EF9322F639666D6 (meal_id), INDEX IDX_4EF9322FA50A6386 (formula_id), PRIMARY KEY(formula_id, meal_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322F639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322FA50A6386 FOREIGN KEY (formula_id) REFERENCES formula (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formula DROP FOREIGN KEY FK_67315881639666D6');
        $this->addSql('DROP INDEX IDX_67315881639666D6 ON formula');
        $this->addSql('ALTER TABLE formula DROP meal_id');
    }
}
