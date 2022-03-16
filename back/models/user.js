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

  User.associate = (db) => {};
  return User;
};
