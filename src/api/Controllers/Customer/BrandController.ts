import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { brand } from '../../Models/BrandModel';
const bcrypt = require('bcrypt');
@JsonController('/brand')
export class BrandController {
    constructor() {}

    // create brand
    @Post()
    public async createBrand(@Body({validate: true}) brandRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(brandRequest)) {
            const saveData = []
            for(const request of brandRequest) {
                const newBrand = new brand();
                newBrand.image = request.image;
                newBrand.name = request.name;
                newBrand.isActive = 1;
                const saveBrand: any = await newBrand.save();
                saveData.push(saveBrand)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new brand !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new brand !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('brandddddd')
            const newBrand = new brand();
            newBrand.image = brandRequest.image;
            newBrand.name = brandRequest.name;
            newBrand.isActive = 1;
            const saveBrand: any = await newBrand.save();
            if (saveBrand) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new brand !!',
                    data: saveBrand
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new brand !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get brand list
    // @Authorized()
    @Get()
    public async getBrand(@Res() response: any): Promise<any> {
        const brandData = await brand.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the brand list !!',
                data: brandData
            };
            return response.status(200).send(successResponse);
    }

    // update brand API
    @Put('/:id')
    public async updateBrand(@Param('id') id: string, @Body({validate: true}) brandRequest: any, @Res() response: any): Promise<any> {
        const ifBrand = await brand.findOne({_id: id});
        if (!ifBrand) {
            return response.status(400).send({status: 0, message: 'Invalid Brand Id !!'});
        }
        ifBrand.image = brandRequest.image;
        ifBrand.name = brandRequest.name;
        ifBrand.isActive = brandRequest.isActive;
        const updateBrand = await ifBrand.save();
        if (updateBrand) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Brand !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the brand !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async brandDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBrand = await brand.findOne({_id: id});
        if (!ifBrand) {
            return response.status(400).send({status: 0, message: 'Unable to get the brand detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the brand detail',
            data: ifBrand
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteBrand(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBrand = await brand.findOne({_id: id});
        if (!ifBrand) {
            return response.status(400).send({status: 0, message: 'Inlid Brand is !!'});
        }
        const deleteBrand = await brand.deleteOne({_id: id});
        if (deleteBrand) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Brand !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Brand !!'});
    }
}
