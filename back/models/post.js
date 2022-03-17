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

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsTo(db.Post, { as: "Retweet" });

    // 하나의 게시글에 여러 개 댓글
    db.Post.hasMany(db.Comment);

    // 하나의 게시글에 여러 개 이미지
    db.Post.hasMany(db.Image);

    // 하나의 게시글에 해쉬태그 여러 개, 하나의 해쉬태그에 게시글 여러 개(ex. 인스타 해쉬태그 누르면 여러 개 게시글)
    // 다대다 관계는 둘 다 belongsToMany 사용
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
  };
  return Post;
};
