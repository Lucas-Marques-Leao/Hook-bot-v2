import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { Armas } from "./Armas";
import { Max, MaxLength, Min } from 'class-validator';


@Entity('fichas')
export class Ficha {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    author_id: string;

    @Column({ unique: true})
    @MaxLength(30, { message: "é um aventureiro ou o Dom Pedro???"})
    nome_ficha: string;

    @Column({ length: 15})
    @MaxLength(15, { message: "Não existe raça com esse tanto de caracteres"})
    raça: string;

    @Column({ default: 10, nullable: true})
    idade: number;

    @Column()
    foto: string;

    @Column()
    classe_pri: string;

    @Column({ default: 1})
    @Max(20, { message: "O nível Máximo é 20"})
    @Min(0, { message: "É o Involuis???"})
    nivel_pri: number;

    @Column({ default: 'nenhuma', nullable: true})
    classe_sec: string;

    @Column({ default: 0, nullable: true})
    nivel_sec: number;

    @Column({ default: 10})
    str_at: number;

    @Column({ default: 10})
    dex_at: number;

    @Column({ default: 10})
    con_at: number;

    @Column({ default: 10})
    int_at: number;

    @Column({ default: 10})
    wis_at: number;

    @Column({ default: 10})
    cha_at: number;

    @Column({ default: 5})
    saude: number;

    @Column({ default: 0})
    saude_temp: number;

    @Column({default: 0, nullable: true})
    nivel_conj: number;

    @ManyToMany(() => Armas, { eager: true, cascade: true})
    @JoinTable()
    armas_inventario: Armas[];

    @CreateDateColumn({ name: 'created_At'})
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_At'})
    updatedAt: Date

}

