<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Context\ExecutionContextInterface;
use Doctrine\ORM\Mapping as ORM;
use Swagger\Annotations as SWG;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MenuRepository")
 */
class Menu
{
    private const ERROR_EMPTY_DATE_MESSAGE = 'The date must not be empty.';
    private const ERROR_EMPTY_DATE_PATH = 'date';

    private const ERROR_EMPTY_MENU_ITEM_MESSAGE = 'The menu item id must not be empty.';
    private const ERROR_EMPTY_MENU_ITEM_PATH = 'menu_item_id';


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
     * )
     */
    private $id;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(type="datetime")
     */
    private $date;

    /**
     * @var \App\Entity\MenuItem|null
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\MenuItem")
     * @ORM\JoinColumn(nullable=false, name="menu_item_id", referencedColumnName="id")
     */
    private $menu_item_id;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return \DateTime|null
     */
    public function getDate(): ?\DateTime
    {
        return $this->date;
    }

    /**
     * @param \DateTime|null $date
     * @return \App\Entity\Menu
     */
    public function setDate(?\DateTime $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return \App\Entity\MenuItem|null
     */
    public function getMenuItem(): ?MenuItem
    {
        return $this->menu_item_id;
    }

    /**
     * @param \App\Entity\MenuItem|null $menu_item_id
     * @return \App\Entity\Menu
     */
    public function setMenuItem(?MenuItem $menu_item_id): self
    {
        $this->menu_item_id = $menu_item_id;

        return $this;
    }

    /**
     * @Assert\Callback()
     * @param \Symfony\Component\Validator\Context\ExecutionContextInterface $context
     */
    public function validate(ExecutionContextInterface $context)
    {
        if (!$this->getDate()) {
            $context->buildViolation(self::ERROR_EMPTY_DATE_MESSAGE)
                ->atPath(self::ERROR_EMPTY_DATE_PATH)
                ->addViolation();
        }
        if (!$this->getMenuItem()) {
            $context->buildViolation(self::ERROR_EMPTY_MENU_ITEM_MESSAGE)
                ->atPath(self::ERROR_EMPTY_MENU_ITEM_PATH)
                ->addViolation();
        }
    }
}
