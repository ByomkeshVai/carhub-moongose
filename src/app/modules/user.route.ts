import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.getAllUsers)
router.get('/users/:userId', UserController.getSingleUser)
router.put('/users/:userId', UserController.updateUser)
router.delete('/users/:userId', UserController.deleteUser)


router.put('/users/:userId/orders', UserController.addOrder)
router.get('/users/:userId/orders', UserController.getSingleOrder)
router.get('/users/:userId/orders/total-price', UserController.calculatePrice)


export const UserRoutes = router;