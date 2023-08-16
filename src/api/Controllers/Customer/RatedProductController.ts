import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { ratedProduct } from '../../Models/RatedModel';
import { async } from 'node-stream-zip';
import { product } from '../../Models/ProductModel';
import { productRatting } from '../../Models/ProductRattingModel';
import { productReview } from '../../Models/ProductReviewModel';
@JsonController('/rated')
export class RatedController {
    constructor() {}

    // create rated
    @Post()
    public async createRated(@Body({validate: true}) ratedRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(ratedRequest)) {
            const saveData = []
            for(const request of ratedRequest) {
                const rattingOne = await productRatting.find({$and: [{productId: request.productId}, {ratting: 1}]});
                const rattingTwo = await productRatting.find({$and: [{productId: request.productId}, {ratting: 2}]});
                const rattingthree = await productRatting.find({$and: [{productId: request.productId}, {ratting: 3}]});
                const rattingFour = await productRatting.find({$and: [{productId: request.productId}, {ratting: 4}]});
                const rattingFive = await productRatting.find({$and: [{productId: request.productId}, {ratting: 5}]});
                const totalScore = ((1 * rattingOne.length)+(2 * rattingTwo.length)+(3 * rattingthree.length)+(4 * rattingFour.length)+(5 * rattingFive.length));
                const totalCustomer = rattingOne.length + rattingTwo.length + rattingthree.length + rattingFour.length + rattingFive.length;
                let totalRating;
                if (totalCustomer === 0) {
                    totalRating = 0
                } else {
                    totalRating = totalScore/totalCustomer;
                }
                const newRated = new ratedProduct();
                newRated.productId = request.productId;
                newRated.ratting = totalRating;
                newRated.isRattedProduct = request.isRattedProduct
                const saveRated: any = await newRated.save();
                saveData.push(saveRated)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new rated !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new rated !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            const rattingOne = await productRatting.find({$and: [{productId: ratedRequest.productId}, {ratting: 1}]});
            const rattingTwo = await productRatting.find({$and: [{productId: ratedRequest.productId}, {ratting: 2}]});
            const rattingthree = await productRatting.find({$and: [{productId: ratedRequest.productId}, {ratting: 3}]});
            const rattingFour = await productRatting.find({$and: [{productId: ratedRequest.productId}, {ratting: 4}]});
            const rattingFive = await productRatting.find({$and: [{productId: ratedRequest.productId}, {ratting: 5}]});
            const totalScore = ((1 * rattingOne.length)+(2 * rattingTwo.length)+(3 * rattingthree.length)+(4 * rattingFour.length)+(5 * rattingFive.length));
            const totalCustomer = rattingOne.length + rattingTwo.length + rattingthree.length + rattingFour.length + rattingFive.length;
            const totalRating = totalScore/totalCustomer;
            const newRated = new ratedProduct();
            newRated.productId = ratedRequest.productId;
            newRated.ratting = totalRating;
            newRated.isRattedProduct = ratedRequest.isRattedProduct
            const saveRated: any = await newRated.save();
            if (saveRated) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new rated !!',
                    data: saveRated
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new rated !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get rated list
    // @Authorized()
    @Get()
    public async getRated(@Res() response: any): Promise<any> {
        const ratedData = await ratedProduct.find({isRattedProduct: 1
        }).then(async(value) => {
            const mapping = value.map(async(data) => {
                const temp: any = {};
                const productData: any = await product.findOne({_id: data.productId});
                const rate = data.ratting;
                const ratting = [];
                let i=1;
                while(i <= 5) {
                    if (i<=rate) {
                        await ratting.push(1)
                    } else {
                        await ratting.push(0);
                    }
                    i++;
                }
                const review = await productReview.find({productId: data.productId})
                temp.image = productData.image?productData.image:'';
                temp.productName = productData.name?productData.name:'';
                temp.price = productData.price?productData.price:'';
                temp.sku = productData.sku?productData.sku:'';
                temp.isHot = productData.isHot?productData.isHot:'';
                temp.ratting = ratting;
                temp.stickOutPrice = productData.strickOutAmount?productData.strickOutAmount:'';
                temp.reviewCounts = review.length;
                console.log(temp, 'rattinggggg');
                return temp
            });
            const resultValue = await Promise.all(mapping);
            console.log(resultValue,'resultValueresultValueresultValue');
            return resultValue;
        });
            const successResponse = {
                status: 1,
                message: 'Successfully get the rated list !!',
                data: ratedData
            };
            return response.status(200).send(successResponse);
    }

    // update rated API
    @Put('/:id')
    public async updateRated(@Param('id') id: string, @Body({validate: true}) ratedRequest: any, @Res() response: any): Promise<any> {
        const ifRated = await ratedProduct.findOne({_id: id});
        if (!ifRated) {
            return response.status(400).send({status: 0, message: 'Invalid Rated Id !!'});
        }
        ifRated.productId = ratedRequest.productId;
        const updateRated = await ifRated.save();
        if (updateRated) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Rated !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the rated !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async ratedDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifRated = await ratedProduct.findOne({_id: id});
        if (!ifRated) {
            return response.status(400).send({status: 0, message: 'Unable to get the rated detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the rated detail',
            data: ifRated
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteRated(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifRated = await ratedProduct.findOne({_id: id});
        if (!ifRated) {
            return response.status(400).send({status: 0, message: 'Inlid Rated is !!'});
        }
        const deleteRated = await ratedProduct.deleteOne({_id: id});
        if (deleteRated) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Rated !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Rated !!'});
    }
}
