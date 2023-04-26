<?php

namespace App\Entity;

use App\Repository\RestaurantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RestaurantRepository::class)]
class Restaurant
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $address = null;

    #[ORM\Column]
    private ?int $service_capacity = null;

    #[ORM\OneToMany(mappedBy: 'restaurant', targetEntity: Booking::class)]
    private Collection $bookings;

    #[ORM\OneToMany(mappedBy: 'restaurant', targetEntity: Dish::class)]
    private Collection $dishes;

    #[ORM\OneToMany(mappedBy: 'restaurant', targetEntity: Meal::class)]
    private Collection $meals;

    #[ORM\OneToMany(mappedBy: 'restaurant', targetEntity: OpeningHours::class)]
    private Collection $schedule;

    #[ORM\OneToMany(mappedBy: 'restaurant', targetEntity: ClosingDate::class)]
    private Collection $closing_dates;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
        $this->dishes = new ArrayCollection();
        $this->meals = new ArrayCollection();
        $this->schedule = new ArrayCollection();
        $this->closing_dates = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getServiceCapacity(): ?int
    {
        return $this->service_capacity;
    }

    public function setServiceCapacity(int $service_capacity): self
    {
        $this->service_capacity = $service_capacity;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setRestaurant($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getRestaurant() === $this) {
                $booking->setRestaurant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Dish>
     */
    public function getDishes(): Collection
    {
        return $this->dishes;
    }

    public function addDish(Dish $dish): self
    {
        if (!$this->dishes->contains($dish)) {
            $this->dishes->add($dish);
            $dish->setRestaurant($this);
        }

        return $this;
    }

    public function removeDish(Dish $dish): self
    {
        if ($this->dishes->removeElement($dish)) {
            // set the owning side to null (unless already changed)
            if ($dish->getRestaurant() === $this) {
                $dish->setRestaurant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Meal>
     */
    public function getMeals(): Collection
    {
        return $this->meals;
    }

    public function addMeal(Meal $meal): self
    {
        if (!$this->meals->contains($meal)) {
            $this->meals->add($meal);
            $meal->setRestaurant($this);
        }

        return $this;
    }

    public function removeMeal(Meal $meal): self
    {
        if ($this->meals->removeElement($meal)) {
            // set the owning side to null (unless already changed)
            if ($meal->getRestaurant() === $this) {
                $meal->setRestaurant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, OpeningHours>
     */
    public function getSchedule(): Collection
    {
        return $this->schedule;
    }

    public function addSchedule(OpeningHours $schedule): self
    {
        if (!$this->schedule->contains($schedule)) {
            $this->schedule->add($schedule);
            $schedule->setRestaurant($this);
        }

        return $this;
    }

    public function removeSchedule(OpeningHours $schedule): self
    {
        if ($this->schedule->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getRestaurant() === $this) {
                $schedule->setRestaurant(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ClosingDate>
     */
    public function getClosingDates(): Collection
    {
        return $this->closing_dates;
    }

    public function addClosingDate(ClosingDate $closingDate): self
    {
        if (!$this->closing_dates->contains($closingDate)) {
            $this->closing_dates->add($closingDate);
            $closingDate->setRestaurant($this);
        }

        return $this;
    }

    public function removeClosingDate(ClosingDate $closingDate): self
    {
        if ($this->closing_dates->removeElement($closingDate)) {
            // set the owning side to null (unless already changed)
            if ($closingDate->getRestaurant() === $this) {
                $closingDate->setRestaurant(null);
            }
        }

        return $this;
    }
}
