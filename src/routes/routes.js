const router = require("express").Router();

const Auth = require("../controllers/auth");
router.route("/getdata").post();

// const { asyncHandler } = require("../middlewares/asyncHandler");
// const checkEmail = require("../middlewares/checkEmail");
// const {
//   signup: signupValidator,
//   signin: signinValidator,
// } = require("../validators/auth");

// router
//   .route("/signup")
//   .post(
//     signupValidator,
//     asyncHandler(checkEmail),
//     asyncHandler(authController.signup)
//   );

// router
//   .route("/signin")
//   .post(signinValidator, asyncHandler(authController.signin));

module.exports = router;
