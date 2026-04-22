import { BaseEntity } from "src/database/entites/base.entitiy";
import { Column, Entity } from "typeorm";

@Entity({ name: "article" })
export class Article extends BaseEntity {

    @Column()
    title!: string;

    @Column()
    content!: string;
}