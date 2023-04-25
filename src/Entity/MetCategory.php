<?php

namespace App\Entity;

use App\Repository\MetCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MetCategoryRepository::class)]
class MetCategory
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'metCategory', targetEntity: Dish::class)]
    private Collection $Dishes;



    public function __construct()
    {
        $this->Dishes = new ArrayCollection();
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

    /**
     * @return Collection<int, Dish>
     */
    public function getDishes(): Collection
    {
        return $this->Dishes;
    }

    public function addDish(Dish $dish): self
    {
        if (!$this->Dishes->contains($dish)) {
            $this->Dishes->add($dish);
            $dish->setMetCategory($this);
        }

        return $this;
    }

    public function removeDish(Dish $dish): self
    {
        if ($this->Dishes->removeElement($dish)) {
            // set the owning side to null (unless already changed)
            if ($dish->getMetCategory() === $this) {
                $dish->setMetCategory(null);
            }
        }

        return $this;
    }
}
