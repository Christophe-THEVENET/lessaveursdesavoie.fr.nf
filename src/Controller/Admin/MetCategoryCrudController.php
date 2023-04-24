<?php

namespace App\Controller\Admin;

use App\Entity\MetCategory;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class MetCategoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return MetCategory::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}