/* créate DATABASE */
/* php bin/console doctrine:database:create */

 CREATE TABLE allergy (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, restaurant_id INT DEFAULT NULL, user_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, date DATE NOT NULL, hour TIME NOT NULL, nb_convives INT NOT NULL, INDEX IDX_E00CEDDEB1E7706E (restaurant_id), INDEX IDX_E00CEDDEA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE closing_date (id INT AUTO_INCREMENT NOT NULL, restaurant_id INT DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_A750DF33B1E7706E (restaurant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE dish (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, restaurant_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, image VARCHAR(255) DEFAULT NULL, is_favorite TINYINT(1) NOT NULL, INDEX IDX_957D8CB812469DE2 (category_id), INDEX IDX_957D8CB8B1E7706E (restaurant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE formula (id INT AUTO_INCREMENT NOT NULL, relation_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, INDEX IDX_673158813256915B (relation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE meal (id INT AUTO_INCREMENT NOT NULL, restaurant_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_9EF68E9CB1E7706E (restaurant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE met_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE opening_hours (id INT AUTO_INCREMENT NOT NULL, restaurant_id INT DEFAULT NULL, day VARCHAR(255) NOT NULL, lunch_start_hour TIME NOT NULL, lunch_end_hour TIME NOT NULL, dinner_start_hour TIME NOT NULL, dinner_end_hour TIME NOT NULL, INDEX IDX_2640C10BB1E7706E (restaurant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE restaurant (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, service_capacity INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

CREATE TABLE user_allergy (user_id INT NOT NULL, allergy_id INT NOT NULL, INDEX IDX_93BC5CBFA76ED395 (user_id), INDEX IDX_93BC5CBFDBFD579D (allergy_id), PRIMARY KEY(user_id, allergy_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB


CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB



ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEB1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)
ALTER TABLE closing_date ADD CONSTRAINT FK_A750DF33B1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
ALTER TABLE dish ADD CONSTRAINT FK_957D8CB812469DE2 FOREIGN KEY (category_id) REFERENCES met_category (id)
ALTER TABLE dish ADD CONSTRAINT FK_957D8CB8B1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
ALTER TABLE formula ADD CONSTRAINT FK_673158813256915B FOREIGN KEY (relation_id) REFERENCES meal (id)
ALTER TABLE meal ADD CONSTRAINT FK_9EF68E9CB1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
ALTER TABLE opening_hours ADD CONSTRAINT FK_2640C10BB1E7706E FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
ALTER TABLE user_allergy ADD CONSTRAINT FK_93BC5CBFA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
ALTER TABLE user_allergy ADD CONSTRAINT FK_93BC5CBFDBFD579D FOREIGN KEY (allergy_id) REFERENCES allergy (id) ON DELETE CASCADE

/*----------------------- 2eme migration ----------------------- */

 CREATE TABLE formula_meal (formula_id INT NOT NULL, meal_id INT NOT NULL, INDEX IDX_4EF9322FA50A6386 (formula_id), INDEX IDX_4EF9322F639666D6 (meal_id), PRIMARY KEY(formula_id, meal_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB

ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322FA50A6386 FOREIGN KEY (formula_id) REFERENCES formula (id) ON DELETE CASCADE
ALTER TABLE formula_meal ADD CONSTRAINT FK_4EF9322F639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE
DROP TABLE category
ALTER TABLE booking ADD allergy LONGTEXT DEFAULT NULL COMMENT (DC2Type:array)
ALTER TABLE dish DROP FOREIGN KEY FK_957D8CB812469DE2
DROP INDEX IDX_957D8CB812469DE2 ON dish
ALTER TABLE dish CHANGE category_id met_category_id INT DEFAULT NULL
ALTER TABLE dish ADD CONSTRAINT FK_957D8CB82CFE2A2D FOREIGN KEY (met_category_id) REFERENCES met_category (id)
CREATE INDEX IDX_957D8CB82CFE2A2D ON dish (met_category_id)
ALTER TABLE formula DROP FOREIGN KEY FK_673158813256915B
DROP INDEX IDX_673158813256915B ON formula
ALTER TABLE formula DROP relation_id
ALTER TABLE user CHANGE roles roles LONGTEXT NOT NULL COMMENT (DC2Type:json)

/*----------------------- 3eme migration ----------------------- */

ALTER TABLE booking CHANGE allergy allergy LONGTEXT DEFAULT NULL COMMENT (DC2Type:simple_array)


/*----------------------- 4eme migration ----------------------- */

ALTER TABLE closing_date CHANGE date date DATE NOT NULL

/*----------------------- 5eme migration ----------------------- */

ALTER TABLE closing_date CHANGE date date VARCHAR(255) NOT NULL COMMENT (DC2Type:dateinterval)

/*----------------------- 6eme migration ----------------------- */

ALTER TABLE closing_date CHANGE date date VARCHAR(255) NOT NULL COMMENT (DC2Type:dateinterval)


/*----------------------- 7eme migration ----------------------- */

ALTER TABLE user ADD name VARCHAR(255) NOT NULL

/*----------------------- 8eme migration ----------------------- */

ALTER TABLE user_allergy DROP FOREIGN KEY FK_93BC5CBFA76ED395
ALTER TABLE user_allergy DROP FOREIGN KEY FK_93BC5CBFDBFD579D
DROP TABLE allergy
DROP TABLE user_allergy
ALTER TABLE user ADD allergy VARCHAR(255) DEFAULT NULL

/*----------------------- 9eme migration ----------------------- */

ALTER TABLE booking CHANGE allergy allergy VARCHAR(255) DEFAULT NULL

/*----------------------- 10eme migration ----------------------- */

ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322F639666D6
ALTER TABLE formula_meal DROP FOREIGN KEY FK_4EF9322FA50A6386
DROP TABLE formula_meal
ALTER TABLE formula ADD meal_id INT DEFAULT NULL
ALTER TABLE formula ADD CONSTRAINT FK_67315881639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id)
CREATE INDEX IDX_67315881639666D6 ON formula (meal_id)

/*----------------------- 11eme migration ----------------------- */

CREATE TABLE meal_formula (meal_id INT NOT NULL, formula_id INT NOT NULL, INDEX IDX_1E82EA98639666D6 (meal_id), INDEX IDX_1E82EA98A50A6386 (formula_id), PRIMARY KEY(meal_id, formula_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
ALTER TABLE meal_formula ADD CONSTRAINT FK_1E82EA98639666D6 FOREIGN KEY (meal_id) REFERENCES meal (id) ON DELETE CASCADE
ALTER TABLE meal_formula ADD CONSTRAINT FK_1E82EA98A50A6386 FOREIGN KEY (formula_id) REFERENCES formula (id) ON DELETE CASCADE
ALTER TABLE formula DROP FOREIGN KEY FK_67315881639666D6
DROP INDEX IDX_67315881639666D6 ON formula
ALTER TABLE formula DROP meal_id

/*----------------------- 12eme migration ----------------------- */

ALTER TABLE dish ADD image_size INT DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL COMMENT (DC2Type:datetime_immutable), CHANGE image image_name VARCHAR(255) DEFAULT NULL