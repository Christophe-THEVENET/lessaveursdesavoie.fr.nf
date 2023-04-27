<?php

namespace App\Controller\Admin;

use App\Entity\ClosingDate;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ClosingDateCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return ClosingDate::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->hideOnForm(),
            yield DateField::new('date', 'Jours de fermeture'),
            yield AssociationField::new('restaurant', 'Restaurant')
            ->setFormTypeOption('choice_label', 'name'),
           
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Jours de fermeture');
    }
    
}
