function testIsLogin() {
    const writeCookie = document.cookie.match(/token=[\w\d].*/gi);
    if (writeCookie) {
      const writeToken = writeCookie[0].split("token=")[1];
      return {
        isLogin: true,
        tryLogin: false,
        token: writeToken,
        error: null
      };
    } else {
      return {
        isLogin: false,
        tryLogin: false,
        token: null,
        error: null
      };
    }
  }
  export default testIsLogin;