import prisma from "../config/prisma.js"
export class CategoryRepository{
    async getCategories(){
        return await prisma.category.findMany()
    }
    async createCategory(name:string){
     try {
           return await prisma.category.create({
             data: {
               name,
             },
           });
     } catch (error:any) {
        console.error(error)
        if(error.code === 'P2002') throw new Error('Já existe uma categoria com o mesmo nome.')
        throw new Error(error.message)
     }
    }
    async deleteCategory(name: string){
      try {
        return await prisma.category.delete({where:{name: name}})
      } catch (error : any) {
        console.error(error)
        throw new Error(error.message)
      }
    }
}