<?php

namespace App\Controller\Admin;

use App\Entity\Meal;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\FormField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class MealCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Meal::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->hideOnForm(),
            yield TextField::new('name', 'Nom'),
            yield AssociationField::new('formulas', 'Formules')->hideOnIndex(),
            yield CollectionField::new('formulas', 'Formules')->useEntryCrudForm(FormulaCrudController::class)->hideOnForm(),
            yield AssociationField::new('restaurant', 'Restaurant'),

        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Menus')
            ->setEntityLabelInSingular('un menu')
            ->setEntityLabelInPlural('des menus');
    }
}
