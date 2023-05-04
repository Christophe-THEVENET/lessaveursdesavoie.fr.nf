<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MealRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MealRepository::class)]
class Meal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['meals'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['meals'])]
    private ?string $name = null;


    #[ORM\ManyToOne(inversedBy: 'meals')]
    private ?Restaurant $restaurant = null;

    #[ORM\ManyToMany(targetEntity: Formula::class, inversedBy: 'meals')]
    #[Groups(['meals'])]
    private Collection $formulas;

   
    public function __construct()
    {
        $this->formulas = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->getName();
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


    public function getRestaurant(): ?Restaurant
    {
        return $this->restaurant;
    }

    public function setRestaurant(?Restaurant $restaurant): self
    {
        $this->restaurant = $restaurant;

        return $this;
    }

    /**
     * @return Collection<int, Formula>
     */
    public function getFormulas(): Collection
    {
        return $this->formulas;
    }

    public function addFormula(Formula $formula): self
    {
        if (!$this->formulas->contains($formula)) {
            $this->formulas->add($formula);
        }

        return $this;
    }

    public function removeFormula(Formula $formula): self
    {
        $this->formulas->removeElement($formula);

        return $this;
    }






}
