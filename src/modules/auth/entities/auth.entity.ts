import { BaseEntity } from "src/database/entites/base.entitiy";
import { Article } from "src/modules/article/entities/article.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { RolesUser } from "src/shared/enums/roles.enum";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: "auth" })
export class Auth extends BaseEntity {
    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: "enum", enum: RolesUser, default: RolesUser.USER })
    role!: RolesUser;

    @Column({ nullable: true })
    otp?: string;

    @Column({ type: "bigint", nullable: true })
    otpTime?: number;

    // relations
    @OneToMany(() => Article, (article) => article.author)
    articles!: Article[]

    @OneToMany(() => Tag, (tag) => tag.createdBy)
    tags!: Tag[]
}
