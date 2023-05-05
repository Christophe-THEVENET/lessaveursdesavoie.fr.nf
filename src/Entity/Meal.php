<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MealRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;




#[ORM\Entity(repositoryClass: MealRepository::class)]
#[Vich\Uploadable]
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

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['meals'])]
    private ?string $entry = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['meals'])]
        private ?string $dish = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['meals'])]
    private ?string $dessert = null;


    #[Vich\UploadableField(mapping: 'meals_images', fileNameProperty: 'imageName', size: 'imageSize')]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['meals'])]
    private ?string $imageName = null;

    #[ORM\Column(nullable: true)]
    private ?int $imageSize = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['meals'])]
    private ?float $price = null;



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

    public function getEntry(): ?string
    {
        return $this->entry;
    }

    public function setEntry(?string $entry): self
    {
        $this->entry = $entry;

        return $this;
    }

    public function getDish(): ?string
    {
        return $this->dish;
    }

    public function setDish(?string $dish): self
    {
        $this->dish = $dish;

        return $this;
    }

    public function getDessert(): ?string
    {
        return $this->dessert;
    }

    public function setDessert(?string $dessert): self
    {
        $this->dessert = $dessert;

        return $this;
    }


    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }
}
