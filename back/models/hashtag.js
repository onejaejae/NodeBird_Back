module.exports = (sequelize, DataTypes) => {
  // mysql에서는 users
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    // 두번 째 객체는 user model에 대한 setting
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Hashtag.associate = (db) => {};
  return Hashtag;
};
