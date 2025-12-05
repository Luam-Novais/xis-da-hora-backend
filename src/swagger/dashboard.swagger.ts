/**
 * @swagger
 * /dashboard/get-daily-revenue:
 *   get:
 *     summary: Pegar receita diaria.
 *     security: 
 *       - adminAuth: []
 *     tags: [dashboard]
 *     responses:
 *       200:
 *         description: ok
 */
/**
 * @swagger
 * /dashboard/get-completed-orders-today:
 *   get:
 *     summary: Pegar pedidos com status de completo do dia.
 *     security: 
 *       - adminAuth: []
 *     tags: [dashboard]
 *     responses:
 *       200:
 *         description: ok
 */
/**
 * @swagger
 * /dashboard/count-orders-by-status:
 *   get:
 *     summary: Fazer contagem de pedidos por status.
 *     security:
 *       - adminAuth: []
 *     tags: [dashboard]
 *     responses:
 *       200:
 *         description: ok
 */
/**
 * @swagger
 * /dashboard/best-seller-products:
 *   get:
 *     summary: Pegar top 3 produtos mais vendidos.
 *     security:
 *       - adminAuth: []
 *     tags: [dashboard]
 *     responses:
 *       200:
 *         description: ok
 */
/**
 * @swagger
 * /dashboard/ticket-medio:
 *   get:
 *     summary: Pegar ticket medio dos ultimos 30 dias.
 *     security:
 *       - adminAuth: []
 *     tags: [dashboard]
 *     responses:
 *       200:
 *         description: ok
 */
