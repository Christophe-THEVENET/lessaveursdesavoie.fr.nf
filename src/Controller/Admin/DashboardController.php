<?php

namespace App\Controller\Admin;

use App\Entity\Allergy;
use App\Entity\Booking;
use App\Entity\ClosingDate;
use App\Entity\Dish;
use App\Entity\Formula;
use App\Entity\Meal;
use App\Entity\MetCategory;
use App\Entity\OpeningHours;
use App\Entity\Restaurant;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    #[IsGranted('ROLE_ADMIN', message: 'Pas d\'authorisation d\'accés a l\'administration.')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        // $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        // return $this->redirect($adminUrlGenerator->setController(OneOfYourCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Lessaveursdesavoie');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Panneau d\'administration', 'fa fa-home');
        yield MenuItem::linkToCrud('Réservations', 'fa-solid fa-calendar-days', Booking::class);
        yield MenuItem::linkToCrud('Menus', 'fa-solid fa-utensils', Meal::class);
        yield MenuItem::linkToCrud('Formules', 'fa-solid fa-table', Formula::class);
        yield MenuItem::linkToCrud('Plats', 'fa-solid fa-plate-wheat', Dish::class);
        yield MenuItem::linkToCrud('Catégorie de plat', 'fa-solid fa-kitchen-set', MetCategory::class);
        yield MenuItem::linkToCrud('Jours de fermeture', 'fa-solid fa-shop-slash', ClosingDate::class);
        yield MenuItem::linkToCrud('Horaires d\'ouverture', 'fa-solid fa-clock', OpeningHours::class);
        yield MenuItem::linkToCrud('Abonnés', 'fa-solid fa-user', User::class);
        yield MenuItem::linkToCrud('Restaurant', 'fa-solid fa-shop', Restaurant::class);
    }
}
