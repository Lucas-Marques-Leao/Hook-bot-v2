import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Armas } from "./Armas";

@Entity('fichas')
export class Ficha {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    author_id: string;

    @Column({
        unique: true
    })
    nome_ficha: string;

    @Column({
        length: 15
    })
    raça: string;

    @Column({
        default: 10,
        nullable: true
    })
    idade: number;

    @Column()
    foto: string;

    @Column()
    classe_pri: string;

    @Column({
        default: 1
    })
    nivel_pri: number;

    @Column({
        default: 'nenhuma',
        nullable: true
    })
    classe_sec: string;

    @Column({
        default: 0,
        nullable: true
    })
    nivel_sec: number;

    @Column({
        default: 10
    })
    str_at: number;

    @Column({
        default: 10
    })
    dex_at: number;

    @Column({
        default: 10
    })
    con_at: number;

    @Column({
        default: 10
    })
    int_at: number;

    @Column({
        default: 10
    })
    wis_at: number;

    @Column({
        default: 10
    })
    cha_at: number;

    @Column({
        default: 5
    })
    saude: number;

    @Column({
        default: 0
    })
    saude_temp: number;

    @Column({
        default: 0,
        nullable: true
    })
    nivel_conj: number;

    @ManyToMany(type => Armas, { eager: true, cascade: true})
    @JoinTable()
    armas_inventario: Armas[];

    @CreateDateColumn({ name: 'created_At'})
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_At'})
    updatedAt: Date

}

