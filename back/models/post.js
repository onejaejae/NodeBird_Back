module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        // TEXT는 글자 수 제한 없는 STRING
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    // 두번 째 객체는 user model에 대한 setting
    {
      // utf8mb4 => 한글 사용 가능, 이모티콘 저장
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  Post.associate = (db) => {};
  return Post;
};
