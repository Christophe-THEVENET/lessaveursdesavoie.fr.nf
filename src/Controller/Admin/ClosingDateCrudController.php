<?php

namespace App\Controller\Admin;

use App\Entity\ClosingDate;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
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
            DateField::new('date', 'Jours de fermeture'),
           
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Jours de fermeture');
    }
    
}
