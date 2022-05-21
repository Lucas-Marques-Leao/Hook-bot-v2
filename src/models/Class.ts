import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('class')
export class Class {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    duration: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    UpdatedAt: Date

}