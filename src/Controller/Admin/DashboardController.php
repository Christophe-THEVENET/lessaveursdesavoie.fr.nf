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
use App\Repository\BookingRepository;
use App\Repository\UserRepository;
use DateTime;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use EasyCorp\Bundle\EasyAdminBundle\Config\Assets;

class DashboardController extends AbstractDashboardController
{

    public function __construct(private UserRepository $userRepository, private BookingRepository $bookingRepository)
    {
    }

    #[Route('/admin', name: 'admin')]
    #[IsGranted('ROLE_ADMIN', message: 'Pas d\'authorisation d\'accés a l\'administration.')]
    public function index(): Response
    {
        
        $users = $this->userRepository->findAll();

        $date = new DateTime();
        $tomorrow = new DateTime('+1 day');
        $afterTomorrow = new DateTime('+2 day');

        $bookingsAtDay = $this->bookingRepository->findByDate($date->setTime(0, 0, 0));
        $bookingsTomorrow = $this->bookingRepository->findByDate($tomorrow->setTime(0, 0, 0));
        $bookingsAfterTomorrow = $this->bookingRepository->findByDate($afterTomorrow->setTime(0, 0, 0));

        return $this->render('admin/dashboard.html.twig', [
            'users' => $users,
            'bookingsAtDay' => $bookingsAtDay,
            'bookingsTomorrow' => $bookingsTomorrow,
            'bookingsAfterTomorrow' => $bookingsAfterTomorrow,
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Les Saveurs De Savoie');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToUrl('Retour a l\'acceuil', 'fa-solid fa-hotel', '/');
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

    public function configureAssets(): Assets
    {
        return Assets::new()->addCssFile('assets/easy-admin.css');
    }
}
