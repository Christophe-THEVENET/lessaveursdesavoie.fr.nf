<?php

namespace App\Controller\Admin;

use App\Entity\Dish;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use Vich\UploaderBundle\Form\Type\VichImageType;

class DishCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Dish::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [
            yield IdField::new('id')->hideOnForm(),
            yield TextField::new('name', 'Nom'),
            yield TextEditorField::new('description'),
            yield ImageField::new('imageName', 'Photo')
                ->onlyOnIndex()
                ->setBasePath('/uploads/dishes'),
            yield TextareaField::new('imageFile', 'Photo')->setFormType(VichImageType::class)->onlyOnForms(),
            yield BooleanField::new('is_favorite', 'Favoris'),
            yield AssociationField::new('metCategory', 'Catégorie'),
            yield MoneyField::new('price', 'Prix')->setCurrency('EUR')->setCustomOption('storedAsCents', false),
            yield AssociationField::new('restaurant', 'Restaurant'),
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Plats')
            ->setEntityLabelInSingular('un plat')
            ->setEntityLabelInPlural('des plats');
    }
}
