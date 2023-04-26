<?php

namespace App\Controller\Admin;

use App\Entity\MetCategory;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class MetCategoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MetCategory::class;
    }

    
    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'Nom'),
           
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Nom de la catégorie');
    }
    
}
