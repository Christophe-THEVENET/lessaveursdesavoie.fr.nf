<?php

namespace App\Entity;

use App\Repository\OpeningHoursRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OpeningHoursRepository::class)]
class OpeningHours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $day = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $lunch_start_hour = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $lunch_end_hour = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $dinner_start_hour = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $dinner_end_hour = null;

    #[ORM\ManyToOne(inversedBy: 'schedule')]
    private ?Restaurant $restaurant = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getLunchStartHour(): ?\DateTimeInterface
    {
        return $this->lunch_start_hour;
    }

    public function setLunchStartHour(\DateTimeInterface $lunch_start_hour): self
    {
        $this->lunch_start_hour = $lunch_start_hour;

        return $this;
    }

    public function getLunchEndHour(): ?\DateTimeInterface
    {
        return $this->lunch_end_hour;
    }

    public function setLunchEndHour(\DateTimeInterface $lunch_end_hour): self
    {
        $this->lunch_end_hour = $lunch_end_hour;

        return $this;
    }

    public function getDinnerStartHour(): ?\DateTimeInterface
    {
        return $this->dinner_start_hour;
    }

    public function setDinnerStartHour(\DateTimeInterface $dinner_start_hour): self
    {
        $this->dinner_start_hour = $dinner_start_hour;

        return $this;
    }

    public function getDinnerEndHour(): ?\DateTimeInterface
    {
        return $this->dinner_end_hour;
    }

    public function setDinnerEndHour(\DateTimeInterface $dinner_end_hour): self
    {
        $this->dinner_end_hour = $dinner_end_hour;

        return $this;
    }

    public function getRestaurant(): ?Restaurant
    {
        return $this->restaurant;
    }

    public function setRestaurant(?Restaurant $restaurant): self
    {
        $this->restaurant = $restaurant;

        return $this;
    }
}
