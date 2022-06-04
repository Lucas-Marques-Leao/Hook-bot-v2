import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('armas')
export class Armas {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome_arma: string;

    @Column({ nullable: true, default: 'Uma Arma elegante, para tempos mais Civilizados'})
    descrição: string;

    @Column({ nullable: true, default: 0})
    bonus_magico: number;

    @Column()
    dano: string;

    @Column({ nullable: true, default: 'Existe, e é isso'})
    propriedades: string;

    @Column()
    foto: string

    @CreateDateColumn({ name: 'created_At'})
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_At'})
    UpdatedAt: Date

}