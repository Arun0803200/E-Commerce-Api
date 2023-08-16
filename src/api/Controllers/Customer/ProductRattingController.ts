import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { productRatting } from '../../Models/ProductRattingModel';
import { async } from 'node-stream-zip';
import { product } from '../../Models/ProductModel';
@JsonController('/ratting')
export class RattingController {
    constructor() {}

    // create ratting
    @Post()
    public async createRatting(@Body({validate: true}) rattingRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(rattingRequest)) {
            const saveData = []
            for(const request of rattingRequest) {
                const newRatting = new productRatting();
                newRatting.productId = request.productId;
                newRatting.ratting = request.ratting;
                newRatting.customerId = request.customerId;
                const saveRatting: any = await newRatting.save();
                saveData.push(saveRatting)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new ratting !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new ratting !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('rattingddddd')
            const newRatting = new productRatting();
            newRatting.productId = rattingRequest.productId;
            newRatting.ratting = rattingRequest.ratting;
            newRatting.customerId = rattingRequest.customerId;
            const saveRatting: any = await newRatting.save();
            if (saveRatting) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new ratting !!',
                    data: saveRatting
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new ratting !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get ratting list
    // @Authorized()
    @Get()
    public async getRatting(@Res() response: any): Promise<any> {
        const rattingData = await productRatting.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the ratting list !!',
                data: rattingData
            };
            return response.status(200).send(successResponse);
    }

    // update ratting API
    @Put('/:id')
    public async updateRatting(@Param('id') id: string, @Body({validate: true}) rattingRequest: any, @Res() response: any): Promise<any> {
        const ifRatting = await productRatting.findOne({_id: id});
        if (!ifRatting) {
            return response.status(400).send({status: 0, message: 'Invalid Ratting Id !!'});
        }
        ifRatting.productId = rattingRequest.productId;
        ifRatting.ratting = rattingRequest.ratting;
        ifRatting.customerId = rattingRequest.customerId;
        const updateRatting = await ifRatting.save();
        if (updateRatting) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Ratting !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the ratting !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async rattingDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifRatting = await productRatting.findOne({_id: id});
        if (!ifRatting) {
            return response.status(400).send({status: 0, message: 'Unable to get the ratting detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the ratting detail',
            data: ifRatting
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteRatting(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifRatting = await productRatting.findOne({_id: id});
        if (!ifRatting) {
            return response.status(400).send({status: 0, message: 'Inlid Ratting is !!'});
        }
        const deleteRatting = await productRatting.deleteOne({_id: id});
        if (deleteRatting) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Ratting !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Ratting !!'});
    }
}
