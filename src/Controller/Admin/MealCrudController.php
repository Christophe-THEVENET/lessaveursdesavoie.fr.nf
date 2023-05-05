<?php

namespace App\Controller\Admin;

use App\Entity\Meal;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use Vich\UploaderBundle\Form\Type\VichImageType;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
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
            yield TextField::new('entry', 'Entrée'),
            yield TextField::new('dish', 'Plat'),
            yield TextField::new('dessert', 'Dessert'),
            yield MoneyField::new('price', 'Prix')->setCurrency('EUR')->setCustomOption('storedAsCents', false),
            yield ImageField::new('imageName', 'Photo')
                ->onlyOnIndex()
                ->setBasePath('/uploads/meals'),
            yield TextareaField::new('imageFile', 'Photo')->setFormType(VichImageType::class)->onlyOnForms(),
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
