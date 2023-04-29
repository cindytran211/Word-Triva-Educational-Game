import { Router } from 'express';
const router = Router();
import { createUser, checkUser } from "../data/users.js"
import * as check from "../helpers.js";

router
  .route('/signup')
  .get(async (req, res) => {
    //code here for GET
    return res.render('signup')
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      const firstNameInput = check.validString(req.body.firstNameInput);
      const lastNameInput = check.validString(req.body.lastNameInput);
      const emailAddressInput = check.validEmail(req.body.emailAddressInput);
      const passwordInput = check.validPassword(req.body.passwordInput);
      let roleInput = check.validString(req.body.roleInput);
      if (passwordInput !== req.body.confirmPasswordInput) {
        throw new Error("Passwords do not match");
      }
      if (firstNameInput.length < 2 || firstNameInput.length > 25) {
        throw new Error("First name must be between 2 and 25 characters");
      }
      if (lastNameInput.length < 2 || lastNameInput.length > 25) {
        throw new Error("Last name must be between 2 and 25 characters");
      }
      if (["admin", "user"].indexOf(roleInput.toLowerCase()) < 0) {
        throw new Error("Role can only be either 'admin' or 'user'.")
      }
      roleInput = roleInput.toLowerCase();
      const newUser = await createUser(firstNameInput, lastNameInput, emailAddressInput, passwordInput, roleInput);
      if (newUser.insertedUser) {
        return res.redirect('/login');
      }
      return res.status(500).json({ error: "Internal Server Error" });
    } catch (e) {
      res.status(400).render('signup', { error: e.message })
    }
  });

  router.route('/error').get(async (req, res) => {
    //code here for GET
    //status forbidden
      return res.status(403).render('error');
  });

  export default router;