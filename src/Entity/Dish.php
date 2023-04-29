<?php

namespace App\Entity;

use App\Repository\DishRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: DishRepository::class)]
#[Vich\Uploadable]
class Dish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['dishes'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['dishes'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['dishes'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['dishes'])]
    private ?float $price = null;

    #[ORM\Column]
    private ?bool $is_favorite = null;

    #[ORM\ManyToOne(inversedBy: 'dishes')]
    private ?Restaurant $restaurant = null;

    #[ORM\ManyToOne(inversedBy: 'Dishes')]
    private ?MetCategory $metCategory = null;

    #[Vich\UploadableField(mapping: 'dishes_images', fileNameProperty: 'imageName', size: 'imageSize')]
    #[Groups(['dishes'])]
    private ?File $imageFile = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['dishes'])]
    private ?string $imageName = null;

    #[ORM\Column(nullable: true)]
    private ?int $imageSize = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;




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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function isIsFavorite(): ?bool
    {
        return $this->is_favorite;
    }

    public function setIsFavorite(bool $is_favorite): self
    {
        $this->is_favorite = $is_favorite;

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

    public function getMetCategory(): ?MetCategory
    {
        return $this->metCategory;
    }

    public function setMetCategory(?MetCategory $metCategory): self
    {
        $this->metCategory = $metCategory;

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
}
