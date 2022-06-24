<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Doctrine\ORM\Mapping as ORM;
use Swagger\Annotations as SWG;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MenuItemRepository")
 */
class MenuItem
{
    private const ERROR_EMPTY_NAME_MESSAGE = 'The name must not be empty.';
    private const ERROR_EMPTY_NAME_PATH = 'name';

    private const ERROR_EMPTY_CATEGORY_MESSAGE = 'The name must not be empty.';
    private const ERROR_EMPTY_CATEGORY_PATH = 'category';

    /**
     * @var int|null
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     *
     * @SWG\Property(
     *   description="ID",
     *   example=1
     * ),
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", length=64)
     *
     * @SWG\Property(
     *   description="Menu item name",
     *   example="Solianka"
     * ),
     */
    private $name;

    /**
     * @var float|null
     *
     * @ORM\Column(type="float", nullable=true)
     *
     * @SWG\Property(
     *   description="Price for a portion",
     *   example=60
     * ),
     */
    private $price;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", length=64)
     *
     * @SWG\Property(
     *   description="Category",
     *   example="Soups"
     * ),
     */
    private $category = "Other";

    /**
     * @var int|null
     *
     * @ORM\Column(type="integer", nullable=true)
     *
     * @SWG\Property(
     *   description="serving weight in grams",
     *   example=150
     * ),
     */
    private $weight;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param null|string $name
     * @return self
     */
    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return null|float
     */
    public function getPrice(): ?float
    {
        return $this->price;
    }

    /**
     * @param null|float $price
     * @return self
     */
    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getCategory(): ?string
    {
        return $this->category;
    }

    /**
     * @param null|string $category
     * @return self
     */
    public function setCategory(?string $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return null|int
     */
    public function getWeight(): ?int
    {
        return $this->weight;
    }

    /**
     * @param null|int $weight
     * @return self
     */
    public function setWeight(?int $weight): self
    {
        $this->weight = $weight;

        return $this;
    }

    /**
     * @Assert\Callback()
     * @param \Symfony\Component\Validator\Context\ExecutionContextInterface $context
     */
    public function validate(ExecutionContextInterface $context)
    {
        if (!$this->getName()) {
            $context->buildViolation(self::ERROR_EMPTY_NAME_MESSAGE)
                ->atPath(self::ERROR_EMPTY_NAME_PATH)
                ->addViolation();
        }
        if (!$this->getCategory()) {
            $context->buildViolation(self::ERROR_EMPTY_CATEGORY_MESSAGE)
                ->atPath(self::ERROR_EMPTY_CATEGORY_PATH)
                ->addViolation();
        }
    }
}
