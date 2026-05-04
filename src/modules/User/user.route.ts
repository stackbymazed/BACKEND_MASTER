import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getSingleUser);

export const UserRoutes = router;
