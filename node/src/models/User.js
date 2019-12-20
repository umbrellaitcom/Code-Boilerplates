const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');

class User extends Sequelize.Model {

  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true,
          validate: {
            notNull: true,
            len: [4, 64]
          }
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
            notNull: true
          }
        }
      },
      {
        modelName: "user",
        tableName: 'users',
        timestamps: false,
        paranoid: false,
        sequelize
      }
    );
  }

  static associate (models) {
    this.hasMany(models.Post);
  }

  static generateHash (password) {
    return bcrypt.hashSync(password, 10);
  }

  validatePassword (password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
