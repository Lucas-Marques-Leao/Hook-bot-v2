import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('fichas')
export class Ficha {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @PrimaryColumn()
    author_id: string

    @Column({
        unique:true
    })
    nome_ficha: string

    @Column({
        length: 15
    })
    raça: string

    @Column({
        default: 'x-anos'
    })
    idade: string

    @Column()
    foto: string

    @Column()
    classe_pri: string

    @Column({
        default: 1
    })
    nivel_pri: number

    @Column({
        default: 'nenhuma'
    })
    classe_sec: string

    @Column({
        default: 0
    })
    nivel_sec: number

    @Column({
        default: 10
    })
    str_at: number

    @Column({
        default: 10
    })
    dex_at: number

    @Column({
        default: 10
    })
    con_at: number

    @Column({
        default: 10
    })
    int_at: number

    @Column({
        default: 10
    })
    wis_at: number

    @Column({
        default: 10
    })
    cha_at: number

    @Column({
        default: 5
    })
    saude: number

    @Column({
        default: 0
    })
    saude_temp: number

    @Column({
        default: 0
    })
    nivel_conj: number

    @CreateDateColumn()
    created_At: Date

    @UpdateDateColumn()
    updated_At: Date

}
