const Sequelize = require("sequelize");

class Post extends Sequelize.Model {

  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING(128),
          allowNull: false,
          validate: {
            notNull: true,
            len: [4, 128]
          }
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false,
          defaultValue: '',
          validate: {
            notNull: true,
            len: [ 0, 10000 ]
          }
        }
      },
      {
        modelName: "post",
        tableName: 'posts',
        timestamps: false,
        paranoid: false,
        sequelize
      }
    );
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: { allowNull: false } });
  }
}

module.exports = Post;
