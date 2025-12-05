/**
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Rota para efetuar o login.
 *     tags: [customer]
 *     requestBody:
 *       schema:
 *         type: object
 *       content:
 *         application/json:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: ok
 *       401:
 *         description: Credenciais invalidas.
 */
/**
 * @swagger
 * /customer/register-customer:
 *   post:
 *     summary: Rota para criar uma conta de usuario
 *     tags: [customer]
 *     requestBody:
 *       required: true
 *       content:
 *         aplication/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               cep:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso.
 *       400:
 *         descripition: Falha ao criar usuario.
 */

/**
 * @swagger
 * /customer/update-customer:
 *   put:
 *     summary: Rota para editar um usuario, as propriedades do requestBody são todos opcionais.
 *     security:
 *       - customerAuth: []
 *     tags: [customer]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               cep:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario editado com sucesso.
 *       400:
 *         description: Falha ao editar o usuario.
 */

/**
 * @swagger
 * /customer/delete-customer:
 *   delete:
 *     summary: Rota para apagar um usuario.
 *     security:
 *       - customerAuth: []
 *     tags: [customer]
 *     responses:
 *       204:
 *         description: Usuario deletado com sucesso.
 *       400:
 *         description: Falha ao deletar usuario
 */
