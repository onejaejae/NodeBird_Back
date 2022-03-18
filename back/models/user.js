module.exports = (sequelize, DataTypes) => {
  // mysql에서는 users
  const User = sequelize.define(
    "User",
    {
      // id가 기본적으로 들어가 있다.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        // 비밀번호는 암호화를 하면 길이가 길어지기 때문에 넉넉하게 설정해두는 것이 좋다
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    // 두번 째 객체는 user model에 대한 setting
    {
      // 한글 사용 가능
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  User.associate = (db) => {
    // 일대다 관계 설정
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);

    // 다대다 관계 설정
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });

    // 다대다 관계 설정(같은 테이블 내에서)
    // 나를 팔로우한 사람들이 누군지
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    // 내가 팔로우한 사람들이 누군지
    // through -> table name, foreignKey -> column name
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };

  return User;
};
