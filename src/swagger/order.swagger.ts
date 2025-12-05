/**
 * @swagger 
 * /order/get-orders-user:
 *   get:
 *     summary: Pegar todos os pedidos do usuario.
 *     security:
 *       - customerAuth: []
 *     tags: [order]
 *     responses:
 *       200:
 *         description: ok
 */

/**
 * @swagger
 * /order/create-order:
 *   post:
 *     summary: Rota para criar um pedido.
 *     security: 
 *       - customerAuth: []
 *     tags: [order]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:  
 *                       type: number
 *                     quantity:
 *                       type: number
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso.
 *       400:
 *         description: Falha ao criar pedido.
 */
/**
 * @swagger 
 * order/update-status/{id}:
 *   patch: 
 *     summary: Atualizar o status de um pedido por seu id.
 *     security: 
 *       - adminAuth: []
 *     tags: [order]
 *     parameters:
 *       - name: orderId
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: ok
 *       400: 
 *         description: Falha ao atualizar o pedido.
 */