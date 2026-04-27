import { BaseEntity } from "src/database/entites/base.entitiy";
import { Article } from "src/modules/article/entities/article.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "article_image"})
export class ArticleImage extends BaseEntity {
    @Column({type: "varchar", length: 500})
    url!: string;

    @Column({type: "integer"})
    sortorder!: number;

    // relation
    @ManyToOne(() => Article, (article) => article.images)
    @JoinColumn({name: "article_id"})
    article!: Article 
}
