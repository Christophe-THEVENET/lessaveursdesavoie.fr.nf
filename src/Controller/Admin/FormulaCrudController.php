<?php

namespace App\Controller\Admin;

use App\Entity\Formula;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class FormulaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Formula::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->hideOnForm(),
            yield TextField::new('name', 'Nom'),
            yield TextField::new('description', 'Description'),
            yield MoneyField::new('price', 'Prix')->setCurrency('EUR')->setCustomOption('storedAsCents', false),
            yield AssociationField::new('meals', 'Menus')->hideOnForm(),

        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Formules')
            ->setEntityLabelInSingular('une formule')
            ->setEntityLabelInPlural('des formules');
    }
}
