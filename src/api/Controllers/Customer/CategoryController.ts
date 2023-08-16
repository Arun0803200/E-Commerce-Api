import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { category } from '../../Models/CategoryModel';
@JsonController('/category')
export class CategoryController {
    constructor() {}

    // create category
    @Post()
    public async createCategory(@Body({validate: true}) categoryRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(categoryRequest)) {
            const saveData = []
            for(const request of categoryRequest) {
                const newCategory = new category();
                newCategory.name = request.name;
                newCategory.isActive = 1;
                const saveCategory: any = await newCategory.save();
                saveData.push(saveCategory)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new category !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new category !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('categoryddddd')
            const newCategory = new category();
            newCategory.name = categoryRequest.name;
            newCategory.isActive = 1;
            const saveCategory: any = await newCategory.save();
            if (saveCategory) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new category !!',
                    data: saveCategory
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new category !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get category list
    // @Authorized()
    @Get()
    public async getCategory(@Res() response: any): Promise<any> {
        const categoryData = await category.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the category list !!',
                data: categoryData
            };
            return response.status(200).send(successResponse);
    }

    // update category API
    @Put('/:id')
    public async updateCategory(@Param('id') id: string, @Body({validate: true}) categoryRequest: any, @Res() response: any): Promise<any> {
        const ifCategory = await category.findOne({_id: id});
        if (!ifCategory) {
            return response.status(400).send({status: 0, message: 'Invalid Category Id !!'});
        }
        ifCategory.name = categoryRequest.name;
        ifCategory.isActive = categoryRequest.isActive;
        const updateCategory = await ifCategory.save();
        if (updateCategory) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Category !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the category !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async categoryDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifCategory = await category.findOne({_id: id});
        if (!ifCategory) {
            return response.status(400).send({status: 0, message: 'Unable to get the category detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the category detail',
            data: ifCategory
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteCategory(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifCategory = await category.findOne({_id: id});
        if (!ifCategory) {
            return response.status(400).send({status: 0, message: 'Inlid Category is !!'});
        }
        const deleteCategory = await category.deleteOne({_id: id});
        if (deleteCategory) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Category !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Category !!'});
    }
}
