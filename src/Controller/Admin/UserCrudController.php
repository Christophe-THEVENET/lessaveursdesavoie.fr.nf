<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\FormField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }


    public function configureFields(string $pageName): iterable
    {
        return [

            yield IdField::new('id')->hideOnForm(),
            yield TextField::new('name', 'Nom'),
            yield EmailField::new('email'),
            yield IntegerField::new('nb_convives', 'Nb convives'),
            yield TextField::new('allergy', 'Allergies'),
            yield DateField::new('created_at', 'Date de création'),
            yield ChoiceField::new('roles')
                ->setChoices(['ROLE_ADMIN' => 'ROLE_ADMIN', 'ROLE_TEST' => 'ROLE_TEST', 'ROLE_USER' => 'ROLE_USER'])
                ->allowMultipleChoices()
                ->autocomplete()
                ->setRequired(true),
            yield AssociationField::new('bookings', 'Réservation')->hideOnIndex(),
            yield CollectionField::new('bookings')->useEntryCrudForm(BookingCrudController::class)->hideOnForm()
        ];
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setPageTitle('index', 'Abonnés');
    }
}
