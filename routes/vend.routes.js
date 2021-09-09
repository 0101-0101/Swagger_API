const express = require('express')
const vendRouter = express.Router()

const { purchase, refund } = require('../controllers/vend.controller')

/**
 * @swagger
 * components:
 *   schemas:
 *     Purchase:
 *       type: object
 *       required:
 *         - product
 *         - pay
 *       properties:
 *         product:
 *           type: string
 *           description: Name of Product
 *         pay:
 *           type: integer
 *           description: User Payment
 *       example:
 *         Product: coke
 *         Pay: 50
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReFund:
 *       type: object
 *       required:
 *         - product
 *       properties:
 *         product:
 *           type: string
 *           description: Name of Product
 *       example:
 *         Product: coke
 */

/**
 * @swagger
 *  tags:
 *    name: Purchase
 *    description: Purchase of users
 */

/**
 * @swagger
 *  tags:
 *    name: ReFund
 *    description: ReFund of Product
 */

/**
 * @swagger
 * /purchase:
 *   post:
 *     summary: Purchase an Item
 *     tags: [Purchase]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Purchase' 
 *     responses:
 *       200:
 *         description: Purchase Sucessful
 *         content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Purchase'  
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /refund:
 *   post:
 *     summary: Refund an Product
 *     tags: [ReFund]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReFund' 
 *     responses:
 *       200:
 *         description: Refund Sucessful
 *         content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReFund'  
 *       500:
 *         description: Some server error
 */

vendRouter.post('/purchase',purchase)

vendRouter.post('/refund', refund)


module.exports = vendRouter
