<?php

namespace App\Controller;

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
}
