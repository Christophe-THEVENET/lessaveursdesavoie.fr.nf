<?php

namespace App\Entity;

use App\Repository\BookingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['bookings'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['bookings'])]
    #[Assert\Email(
        message: 'L\'email {{ value }} n\est pas valide.',

    )]
    private ?string $email = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['bookings'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['bookings'])]
    private ?\DateTimeInterface $hour = null;

    #[ORM\Column]
    #[Groups(['bookings'])]
    #[Assert\Positive]
    private ?int $nb_convives = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    private ?Restaurant $restaurant = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[Groups(['bookings'])]
    private ?User $user = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['bookings'])]
    #[Assert\Length(
        max: 100,
        maxMessage: 'Le message {{ limit }} est trop long, il ne devrait pas dépasser {{ limit }} caractères.',
    )]
    private ?string $allergy = null;

    public function __toString()
    {
        return $this->getDate()->format('d-m');
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getHour(): ?\DateTimeInterface
    {
        return $this->hour;
    }

    public function setHour(\DateTimeInterface $hour): self
    {
        $this->hour = $hour;

        return $this;
    }

    public function getNbConvives(): ?int
    {
        return $this->nb_convives;
    }

    public function setNbConvives(int $nb_convives): self
    {
        $this->nb_convives = $nb_convives;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }


    /**
     * Get the value of allergy
     */
    public function getAllergy()
    {
        return $this->allergy;
    }

    /**
     * Set the value of allergy
     *
     * @return  self
     */
    public function setAllergy($allergy)
    {
        $this->allergy = $allergy;

        return $this;
    }
}
