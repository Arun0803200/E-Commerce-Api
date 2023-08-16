import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { bestSellersProduct } from '../../Models/BestSellersModule';
import { product } from '../../Models/ProductModel';
import { ratedProduct } from '../../Models/RatedModel';
import { productReview } from '../../Models/ProductReviewModel';
@JsonController('/best')
export class BestController {
    constructor() {}

    // create best
    @Post()
    public async createBest(@Body({validate: true}) bestRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(bestRequest)) {
            const saveData = []
            for(const request of bestRequest) {
                const newBest = new bestSellersProduct();
                newBest.productId = request.productId;
                const saveBest: any = await newBest.save();
                saveData.push(saveBest)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new best !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new best !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('bestddddd')
            const newBest = new bestSellersProduct();
            newBest.productId = bestRequest.productId;
            const saveBest: any = await newBest.save();
            if (saveBest) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new best !!',
                    data: saveBest
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new best !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get best list
    // @Authorized()
    @Get()
    public async getBest(@Res() response: any): Promise<any> {
        const bestData = await bestSellersProduct.find().then(async(value) => {
            const mapping = value.map(async(data) => {
                const temp: any = {};
                const productData: any = await product.findOne({_id: data.productId});
                const ratedPdt = await ratedProduct.findOne({productId: data.productId})
                const rate = ratedPdt.ratting;
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
                message: 'Successfully get the best list !!',
                data: bestData
            };
            return response.status(200).send(successResponse);
    }

    // update best API
    @Put('/:id')
    public async updateBest(@Param('id') id: string, @Body({validate: true}) bestRequest: any, @Res() response: any): Promise<any> {
        const ifBest = await bestSellersProduct.findOne({_id: id});
        if (!ifBest) {
            return response.status(400).send({status: 0, message: 'Invalid Best Id !!'});
        }
        ifBest.productId = bestRequest.productId;
        const updateBest = await ifBest.save();
        if (updateBest) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Best !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the best !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async bestDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBest = await bestSellersProduct.findOne({_id: id});
        if (!ifBest) {
            return response.status(400).send({status: 0, message: 'Unable to get the best detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the best detail',
            data: ifBest
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteBest(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBest = await bestSellersProduct.findOne({_id: id});
        if (!ifBest) {
            return response.status(400).send({status: 0, message: 'Inlid Best is !!'});
        }
        const deleteBest = await bestSellersProduct.deleteOne({_id: id});
        if (deleteBest) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Best !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Best !!'});
    }
}
