import { BaseEntity } from "src/database/entites/base.entitiy";
import { RolesUser } from "src/shared/enums/roles.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "auth"})
export class Auth extends BaseEntity{
    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({type: "enum", enum: RolesUser, default: RolesUser.USER})
    role!: RolesUser;

    @Column({nullable: true})
    otp?: string;

    @Column({type: "bigint", nullable: true})
    otpTime?: number;
}
