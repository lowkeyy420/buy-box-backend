import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

export default (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });

    return User;
};
