/**
 * @swagger
 * /product/get-products-by-category:
 *   get:
 *     summary: Pega todos os produtos de uma categoria especifica.
 *     tags: [product]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: produtos na categoria não encontrado.
 */

/**
 * @swagger
 * /product/create-product:
 *   post:
 *     summary: Cria um novo produto
 *     security: 
 *       - adminAuth: []
 *     tags: [product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               imageFile:
 *                 type: binary
 *               categoryName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso.
 *       400:
 *         description: falha ao criar o produto.
 *
 */

/**
 * @swagger
 * /product/update-product/{id}:
 *   put:
 *     summary: Editar um produto atraves de seu id.
 *     secutity:
 *       - adminAuth: []
 *     tags: [product]
 *     parameters:
 *       - name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string;
 *               description:
 *                 type: string;
 *               price:
 *                 type: number;
 *               categoryName:
 *                 type: string;
 *     responses:
 *       200:
 *         description: Produto editado com sucesso
 *       400:
 *         description: Falha ao editar o produto.
 *
 */

/**
 * @swagger
 * /product/delete-product/{id}:
 *   delete: 
 *     summary: Deleta um produto pelo id.
 *     security:
 *       - adminAuth: []
 *     tags: [product]
 *     parameters:
 *       - name: id
 *     responses:
 *       204: 
 *         description: Produto excluido com sucesso.
 *       400: 
 *         description: Falha ao excluir o produto.
 */
