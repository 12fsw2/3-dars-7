import { BaseEntity } from "src/database/entites/base.entitiy";
import { ArticleImage } from "src/modules/article_image/entities/article_image.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: "article" })
export class Article extends BaseEntity {
    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    backgroundImage?: string;

    @DeleteDateColumn()
    deleted?: Date; 

    // relations
    @ManyToOne(() => Auth, (user) => user.articles)
    @JoinColumn({name: "user_id"})
    author!: Auth;

    @ManyToMany(() => Tag, (tag) => tag.articles, {nullable: false, cascade: false})
    @JoinTable({name: "tag_id"})
    tags!: Tag[]

    @OneToMany(() => ArticleImage, (article_image) => article_image.article)
     images?: ArticleImage[]
}