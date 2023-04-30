<?php

namespace App\Controller;

use DateTime;
use App\Entity\MetCategory;
use App\Repository\DishRepository;
use App\Repository\MealRepository;
use App\Repository\BookingRepository;
use App\Repository\ClosingDateRepository;
use App\Repository\OpeningHoursRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

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



    // ------------------- API GET BOOKINGS BY DATE ------------------- //
    #[Route('/api/bookings/{date}', name: 'api_bookings_by_date')]
    // !!!!!!!!!!!!!!!!! peut être plus stricte avec le format de la date !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /* #[ParamConverter(options: ['format' => 'dd-mm-yyyy'])] */
    public function getApiBookingsByDate(BookingRepository $bookingRepository, SerializerInterface $serializer, DateTime $date): JsonResponse
    {
        $bookingsByDateList = $bookingRepository->findByDate($date);

        if (!$bookingsByDateList) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }
        $bookingsByDateListSerialized = $serializer->serialize($bookingsByDateList, 'json', ['groups' => 'bookings']);

        return new JsonResponse($bookingsByDateListSerialized, Response::HTTP_OK, [], true);
    }
}
