const cookieGenerate = (
  res,
  {
    isSecure = false,
    cookieName = "token",
    cookieValue = "",
    maxAge = 60 * 60 * 1000,
  }
) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: isSecure, // Not accessible via JS
    sameSite: isSecure ? "none" : "lax",
    maxAge, // 1 m in milliseconds
  });
};

module.exports = { cookieGenerate };
