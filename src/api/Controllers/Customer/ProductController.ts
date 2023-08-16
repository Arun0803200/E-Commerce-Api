import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { product } from '../../Models/ProductModel';
const bcrypt = require('bcrypt');
@JsonController('/product')
export class ProductController {
    constructor() {}

    // create product
    @Post()
    public async createProduct(@Body({validate: true}) productRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(productRequest)) {
            const saveData = []
            for(const request of productRequest) {
                const newProduct = new product();
                newProduct.image = request.image;
                newProduct.name = request.name;
                newProduct.isActive = 1;
                newProduct.price = request.price;
                newProduct.strickOutAmount = request.strickOutAmount;
                newProduct.sku = request.sku;
                newProduct.isHot = request.isHot;
                const saveProduct: any = await newProduct.save();
                saveData.push(saveProduct)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new product !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new product !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('productddddd')
            const newProduct = new product();
                newProduct.image = productRequest.image;
                newProduct.name = productRequest.name;
                newProduct.isActive = 1;
                newProduct.price = productRequest.price;
                newProduct.strickOutAmount = productRequest.strickOutAmount;
                newProduct.sku = productRequest.sku;
                newProduct.isHot = productRequest.isHot;
            const saveProduct: any = await newProduct.save();
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new product !!',
                    data: saveProduct
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new product !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get product list
    @Get()
    public async getProduct(@Res() response: any): Promise<any> {
        const productData = await product.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the product list !!',
                data: productData
            };
            return response.status(200).send(successResponse);
    }

    // update product API
    @Put('/:id')
    public async updateProduct(@Param('id') id: string, @Body({validate: true}) productRequest: any, @Res() response: any): Promise<any> {
        const ifProduct = await product.findOne({_id: id});
        if (!ifProduct) {
            return response.status(400).send({status: 0, message: 'Invalid Product Id !!'});
        }
        ifProduct.image = productRequest.image;
        ifProduct.name = productRequest.name;
        ifProduct.isActive = productRequest.isActive;
        ifProduct.price = productRequest.price;
        ifProduct.strickOutAmount = productRequest.strickOutAmount;
        ifProduct.sku = productRequest.sku;
        ifProduct.isHot = productRequest.isHot;
        const updateProduct = await ifProduct.save();
        if (updateProduct) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Product !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the product !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async productDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifProduct = await product.findOne({_id: id});
        if (!ifProduct) {
            return response.status(400).send({status: 0, message: 'Unable to get the product detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the product detail',
            data: ifProduct
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteProduct(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifProduct = await product.findOne({_id: id});
        if (!ifProduct) {
            return response.status(400).send({status: 0, message: 'Inlid Product is !!'});
        }
        const deleteProduct = await product.deleteOne({_id: id});
        if (deleteProduct) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Product !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Product !!'});
    }
}
