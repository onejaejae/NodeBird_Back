module.exports = (sequelize, DataTypes) => {
  // mysql에서는 users
  const Comment = sequelize.define(
    "Comment",
    {
      // id가 기본적으로 들어가 있다.
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // 두번 째 객체는 user model에 대한 setting
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Comment.associate = (db) => {};
  return Comment;
};
