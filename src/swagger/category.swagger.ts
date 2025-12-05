/**
 * @swagger
 * /category/get-categories:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [category]
 *     responses:
 *       200:
 *         description: OK
 */
/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Cria uma nova categoria
 *     security:
 *       - adminAuth: []
 *     tags: [category]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 */
/**
 * @swagger
 *  /category/delete-category/{categoryName}:
 *   delete:
 *     summary: Deleta uma categoria
 *     security:
 *       - adminAuth: []
 *     tags:
 *       - category
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
