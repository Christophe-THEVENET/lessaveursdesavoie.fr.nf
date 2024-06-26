<?php

namespace App\Controller;

use DateTime;
use App\Entity\Booking;
use App\Entity\User;
use App\Repository\DishRepository;
use App\Repository\MealRepository;
use App\Repository\BookingRepository;
use App\Repository\RestaurantRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ClosingDateRepository;
use App\Repository\OpeningHoursRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class ApiController extends AbstractController
{




    // ------------------- API GET ALL OPENING HOURS ------------------- //
    #[Route('/api/opening-hours', name: 'api_opening_hours')]
    public function getApiOpeningHours(OpeningHoursRepository $openingHoursRepository, SerializerInterface $serializer): JsonResponse
    {
        $openingHoursList = $openingHoursRepository->findAll();

        if (!$openingHoursList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $openingHoursListSerialized = $serializer->serialize($openingHoursList, 'json', ['groups' => 'openingHours']);

        return new JsonResponse($openingHoursListSerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET ALL CLOSED DAYS ------------------- //
    #[Route('/api/closing-date', name: 'api_closing_date')]
    public function getClosingDates(ClosingDateRepository $closingDateRepository, SerializerInterface $serializer): JsonResponse
    {
        $closingDatesList = $closingDateRepository->findAll();

        if (!$closingDatesList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $closingDatesListSerialized = $serializer->serialize($closingDatesList, 'json', ['groups' => 'closingDates']);

        return new JsonResponse($closingDatesListSerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET DISHES  BY CATEGORIE ------------------- //
    #[Route('/api/dishes/{name}', name: 'api_dishes_by_category')]
    public function getApiDishes(DishRepository $dishRepository, SerializerInterface $serializer, $name): JsonResponse
    {
        $dishesByCategoryList = $dishRepository->findByCategory($name);

        if (!$dishesByCategoryList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $dishesByCategoryListSerialized = $serializer->serialize($dishesByCategoryList, 'json', ['groups' => 'dishes']);

        return new JsonResponse($dishesByCategoryListSerialized, Response::HTTP_OK, [], true);
    }


    // ------------------- API GET ALL FAVORITE DISHES ------------------- //
    #[Route('/api/favorite/dishes', name: 'api_favorite_dishes')]
    public function getApiFavoriteDishes(DishRepository $dishRepository, SerializerInterface $serializer): JsonResponse
    {
        $favoriteDishesList = $dishRepository->findByFavorite();

        if (!$favoriteDishesList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $favoritesDishesListSerialized = $serializer->serialize($favoriteDishesList, 'json', ['groups' => 'dishes']);

        return new JsonResponse($favoritesDishesListSerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET ALL MEALS ------------------- //
    #[Route('/api/meals', name: 'api_meals')]
    public function getApiMeals(MealRepository $mealRepository, SerializerInterface $serializer): JsonResponse
    {
        $mealsList = $mealRepository->findAll();

        if (!$mealsList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $mealsListSerialized = $serializer->serialize($mealsList, 'json', ['groups' => 'meals']);

        return new JsonResponse($mealsListSerialized, Response::HTTP_OK, [], true);
    }



    // ------------------- API GET BOOKINGS BY DATE AND LUNCH ------------------- //
    #[Route('/api/bookings/lunch/{date}', name: 'api_bookings_lunch_by_date')]
    // !!!!!!!!!!!!!!!!! peut être plus stricte avec le format de la date !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /* #[ParamConverter(options: ['format' => 'dd-mm-yyyy'])] */
    public function getApiBookingsLunchByDate(BookingRepository $bookingRepository, SerializerInterface $serializer, DateTime $date): JsonResponse
    {
        $bookingsByDateList = $bookingRepository->findByLunchDate($date);
        // si retourne null 404 sinon si tableau vide 200 []
        if ($bookingsByDateList === null) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        } else if (count($bookingsByDateList) === 0) {
            return new JsonResponse([], Response::HTTP_OK);
        }



        $bookingsByDateListSerialized = $serializer->serialize($bookingsByDateList, 'json', ['groups' => 'bookings']);

        return new JsonResponse($bookingsByDateListSerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET BOOKINGS BY DATE AND DINNER------------------- //
    #[Route('/api/bookings/dinner/{date}', name: 'api_bookings_dinner_by_date')]
    // !!!!!!!!!!!!!!!!! peut être plus stricte avec le format de la date !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /* #[ParamConverter(options: ['format' => 'dd-mm-yyyy'])] */
    public function getApiBookingsDinnerByDate(BookingRepository $bookingRepository, SerializerInterface $serializer, DateTime $date): JsonResponse
    {
        $bookingsByDateList = $bookingRepository->findByDinnerDate($date);
        // si retourne null 404 sinon si tableau vide 200 []
        if ($bookingsByDateList === null) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        } else if (count($bookingsByDateList) === 0) {
            return new JsonResponse([], Response::HTTP_OK);
        }


        $bookingsByDateListSerialized = $serializer->serialize($bookingsByDateList, 'json', ['groups' => 'bookings']);

        return new JsonResponse($bookingsByDateListSerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET CAPACITY ------------------- //
    #[Route('/api/capacity', name: 'api_capacity')]
    public function getCapacity(RestaurantRepository $restaurantRepository, SerializerInterface $serializer): JsonResponse
    {
        $capacity = $restaurantRepository->findCapacity();

        if (!$capacity) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $capacitySerialized = $serializer->serialize($capacity, 'json', ['groups' => 'capacity']);

        return new JsonResponse($capacitySerialized, Response::HTTP_OK, [], true);
    }

    // ------------------- API GET USER ------------------- //
    #[Route('/api/user', name: 'api_user')]
    public function getCurrentUser(Security $security, SerializerInterface $serializer): JsonResponse
    {
        $curentUser = $security->getUser();

        /*  if (!$curentUser) {
             return new JsonResponse(null, Response::HTTP_NOT_FOUND);
         } */
        $userSerialized = $serializer->serialize($curentUser, 'json', ['groups' => 'getUser']);

        return new JsonResponse($userSerialized, Response::HTTP_OK, [], true);
    }


    // ------------------- API POST BOOKING ------------------- //
    #[Route('/api/booking', name: 'api_post_booking', methods: ['POST'])]
    public function addBooking(Request $request, RestaurantRepository $restaurantRepository, EntityManagerInterface $entityManager, Security $security): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // Récupérer les données de la requête
        $date = $data['date'] ?? null;
        $hour = $data['hour'] ?? null;
        $nbConvives = $data['nb_convives'] ?? null;
        $allergy = $data['allergy'] ?? null;
        $email = $data['email'];
        $restaurant = $restaurantRepository->findOneBy(['id' => 1]);
        $user = $security->getUser();
        // Vérifier les données requises
        if (!$date || !$hour || !$nbConvives) {
            return new JsonResponse(['error' => 'Veuillez fournir une date, une heure et le nombre de personnes.'],  Response::HTTP_NOT_FOUND);
        }
        $booking = new Booking();
        $booking->setDate(new \Datetime($date));
        $booking->setHour(new \Datetime($hour));
        $booking->setNbConvives($nbConvives);
        $booking->setAllergy($allergy);
        $booking->setEmail($email);
        $booking->setRestaurant($restaurant);
        // Vérifiez si un utilisateur est connecté
        if ($user instanceof User) {
            // Ajoutez l'utilisateur connecté à la réservation
            $booking->setUser($user);
        }
        $entityManager->persist($booking);
        $entityManager->flush();

        return new JsonResponse(['status' => 'Félicitation votre réservation est validée'], Response::HTTP_OK, []);
    }
}
