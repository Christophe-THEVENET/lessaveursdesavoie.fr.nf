<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label_format' => 'Nom',
                "required" => true,
                'attr' => ['class' => 'form-control mb-3'],
                "constraints" => [
                    new Length(["min" => 2, "max" => 180, "minMessage" => "Le nom d'utilisateur ne doit pas faire moins de 2 caractères", "maxMessage" => "Le nom d'utilisateur ne doit pas faire plus de 180 caractères"]),
                    new NotBlank(["message" => "Le nom d'utilisateur ne doit pas être vide !"])
                ]
            ])
            ->add('email', EmailType::class, [
                'label_format' => 'Email',
                "required" => true,
                'attr' => ['class' => 'form-control mb-3'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Veuillez saisir une adresse email',
                    ]),
                    new Email([
                        'message' => 'Veuillez saisir une adresse email valide',
                    ]),
                ],
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'label_format' => 'J\'accepte les conditions d\'utilisation et la politique de confidentialité',
                'mapped' => false,
                'attr' => ['class' => 'my-3'],
                'constraints' => [
                    new IsTrue([
                        'message' => 'Vous êtes d\'accord pour le RGPD.',
                    ]),
                ],
            ])
            ->add('plainPassword', PasswordType::class, [
                'label_format' => 'Mot de passe',
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password', 'class' => 'form-control mb-3'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Entrez un mot de passe',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'Votre mot de passe doit avoir  {{ limit }} charactères minimum',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
            ->add('nb_convives', IntegerType::class, [
                'label_format' => 'Nombre de convives',
                "required" => true,
                'attr' => ['class' => 'form-control mb-3'],
                "constraints" => [
                    new Length(["min" => 1, "max" => 40, "minMessage" => "Au moins une personne dit réserver", "maxMessage" => "La capacité du restaurant est de 40 personnes maximum"]),
                    new NotBlank(["message" => "Le nombre de convives ne doit pas être vide !"])
                ]
            ])
            ->add('allergy', TextType::class, [
                'label_format' => 'Allergies',
                "required" => false,
                'attr' => ['class' => 'form-control mb-3'],
                
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
