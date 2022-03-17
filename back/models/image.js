module.exports = (sequelize, DataTypes) => {
  // mysql에서는 users
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    // 두번 째 객체는 user model에 대한 setting
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
