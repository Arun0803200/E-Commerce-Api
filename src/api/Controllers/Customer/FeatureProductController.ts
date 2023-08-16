import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { featureProduct } from '../../Models/FeatureProduct';
import { async } from 'node-stream-zip';
import { product } from '../../Models/ProductModel';
import { ratedProduct } from '../../Models/RatedModel';
import { productReview } from '../../Models/ProductReviewModel';
@JsonController('/feature')
export class FeatureController {
    constructor() {}

    // create feature
    @Post()
    public async createFeature(@Body({validate: true}) featureRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(featureRequest)) {
            const saveData = []
            for(const request of featureRequest) {
                const newFeature = new featureProduct();
                newFeature.productId = request.productId;
                const saveFeature: any = await newFeature.save();
                saveData.push(saveFeature)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new feature !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new feature !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            const newFeature = new featureProduct();
            newFeature.productId = featureRequest.productId;
            const saveFeature: any = await newFeature.save();
            if (saveFeature) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new feature !!',
                    data: saveFeature
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new feature !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get feature list
    // @Authorized()
    @Get()
    public async getFeature(@Res() response: any): Promise<any> {
        const featureData = await featureProduct.find().then(async(value) => {
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
                return temp
            });
            const resultValue = await Promise.all(mapping);
            console.log(resultValue,'resultValueresultValueresultValue');
            return resultValue;
        });
            const successResponse = {
                status: 1,
                message: 'Successfully get the feature list !!',
                data: featureData
            };
            return response.status(200).send(successResponse);
    }

    // update feature API
    @Put('/:id')
    public async updateFeature(@Param('id') id: string, @Body({validate: true}) featureRequest: any, @Res() response: any): Promise<any> {
        const ifFeature = await featureProduct.findOne({_id: id});
        if (!ifFeature) {
            return response.status(400).send({status: 0, message: 'Invalid Feature Id !!'});
        }
        ifFeature.productId = featureRequest.productId;
        const updateFeature = await ifFeature.save();
        if (updateFeature) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Feature !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the feature !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async featureDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifFeature = await featureProduct.findOne({_id: id});
        if (!ifFeature) {
            return response.status(400).send({status: 0, message: 'Unable to get the feature detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the feature detail',
            data: ifFeature
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteFeature(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifFeature = await featureProduct.findOne({_id: id});
        if (!ifFeature) {
            return response.status(400).send({status: 0, message: 'Inlid Feature is !!'});
        }
        const deleteFeature = await featureProduct.deleteOne({_id: id});
        if (deleteFeature) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Feature !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Feature !!'});
    }
}
