<?php

namespace App\Controller;

use App\Repository\BookingRepository;
use App\Repository\ClosingDateRepository;
use App\Repository\DishRepository;
use App\Repository\MealRepository;
use App\Repository\OpeningHoursRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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

        // ------------------- API GET ALL DISHES ------------------- //
        #[Route('/api/dishes', name: 'api_dishes')]
        public function getApiDishes(DishRepository $dishRepository, SerializerInterface $serializer): JsonResponse
        {
            $dishesList = $dishRepository->findAll();
    
            if (!$dishesList) {
                return new JsonResponse(null, Response::HTTP_NOT_FOUND);
            }
            $dishesListSerialized = $serializer->serialize($dishesList, 'json', ['groups' => 'dishes']);
    
            return new JsonResponse($dishesListSerialized, Response::HTTP_OK, [], true);
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





         // ------------------- API GET ALL BOOKING BY DAY ------------------- //
         #[Route('/api/booking/{day}', name: 'api_bookings_by_day')]
         public function getApiBookingsByDay(BookingRepository $bookingRepository, SerializerInterface $serializer): JsonResponse
         {
             $dishesList = $bookingRepository->findAll();
     
             if (!$dishesList) {
                 return new JsonResponse(null, Response::HTTP_NOT_FOUND);
             }
             $dishesListSerialized = $serializer->serialize($dishesList, 'json', ['groups' => 'dishes']);
     
             return new JsonResponse($dishesListSerialized, Response::HTTP_OK, [], true);
         }








}
