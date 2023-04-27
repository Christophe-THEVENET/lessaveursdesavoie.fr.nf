<?php

namespace App\Controller\Admin;

use App\Entity\OpeningHours;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class OpeningHoursCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return OpeningHours::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->hideOnForm(),
            yield TextField::new('day', 'Jour'),
            yield TimeField::new('lunch_start_hour', 'Ouverture du midi'),
            yield TimeField::new('lunch_end_hour', 'Fermeture du midi'),
            yield TimeField::new('dinner_start_hour', 'Ouverture du soir'),
            yield TimeField::new('dinner_end_hour', 'Ouverture du soir'),
            yield AssociationField::new('restaurant', 'Restaurant')
                ->setFormTypeOption('choice_label', 'name')
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Horaires d\'ouverture')
            ->setTimeFormat('HH:mm');
    }
}
