<?php

namespace App\Repository;

use App\Entity\Dish;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Dish>
 *
 * @method Dish|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dish|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dish[]    findAll()
 * @method Dish[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DishRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Dish::class);
    }

    public function save(Dish $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Dish $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    //    /**
    //     * @return Dish[] Returns an array of favorite Dish objects
    //     */
    public function findByFavorite(): array
    {
        return $this->createQueryBuilder('d')
            ->where('d.is_favorite = true')
            ->getQuery()
            ->getResult();
    }


    //    /**
    //     * @return Dish[] Returns an array of Dish objects by category
    //     */
    public function findByCategory($value): array
    {
        return $this->createQueryBuilder('d')
            ->addSelect('c')
            ->leftJoin('d.metCategory', 'c')
            ->andWhere('c.name = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }




    //    public function findOneBySomeField($value): ?Dish
    //    {
    //        return $this->createQueryBuilder('d')
    //            ->andWhere('d.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
