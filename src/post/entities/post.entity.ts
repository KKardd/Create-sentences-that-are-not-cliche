import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity("Post")
export class PostEntity {
    @PrimaryColumn()
    id: string;

    @Column({length: 30})
    title: string;

    @Column("json")
    sentence: string[];

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    hits: number;
}
