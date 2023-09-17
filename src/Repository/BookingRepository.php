<?php

namespace App\Repository;

use DateTime;
use App\Entity\Booking;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Booking>
 *
 * @method Booking|null find($id, $lockMode = null, $lockVersion = null)
 * @method Booking|null findOneBy(array $criteria, array $orderBy = null)
 * @method Booking[]    findAll()
 * @method Booking[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BookingRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Booking::class);
    }

    public function save(Booking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Booking $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Booking[] Returns an array of Booking objects by date
     */
    public function findByDate(DateTime $date): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.date = :val')
            ->setParameter('val', $date)
            ->orderBy('b.hour', 'ASC')
            ->getQuery()
            ->getResult();
    }


    /**
     * @return Booking[] Returns an array of Booking objects by date
     */
    /* public function findByLunchDate(DateTime $date): array
    {
        return $this->createQuery(
            'SELECT * FROM booking b
            WHERE b.date = :val
            AND TIME(b.hour) BETWEEN :startTime AND :endTime'
        )->setParameter(':val', $date)
            ->setParameter('startTime', '10:00:00')
            ->setParameter('endTime', '14:59:59')
            ->getResult();
    } */

    public function findByLunchDate(DateTime $date): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.date = :val')
            ->setParameter('val', $date)
            ->andWhere('b.hour BETWEEN :startTime AND :endTime')
            ->setParameter('startTime', '10:00:00')
            ->setParameter('endTime', '14:59:59')
            ->getQuery()
            ->getResult();
    }

    public function findByDinnerDate(DateTime $date): array
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.date = :val')
            ->setParameter('val', $date)
            ->andWhere('b.hour BETWEEN :startTime AND :endTime')
            ->setParameter('startTime', '17:00:00')
            ->setParameter('endTime', '23:59:59')
            ->getQuery()
            ->getResult();
    }

    //    public function findOneBySomeField($value): ?Booking
    //    {
    //        return $this->createQueryBuilder('b')
    //            ->andWhere('b.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
