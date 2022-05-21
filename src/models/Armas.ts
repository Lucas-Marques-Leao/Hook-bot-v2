import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Armas {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
