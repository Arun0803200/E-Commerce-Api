import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { specialOffProduct } from '../../Models/SpecialOffProductModel';
import { product } from '../../Models/ProductModel';
import { ratedProduct } from '../../Models/RatedModel';
import { productReview } from '../../Models/ProductReviewModel';
@JsonController('/special')
export class SpecialController {
    constructor() {}

    // create special
    @Post()
    public async createSpecial(@Body({validate: true}) specialRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(specialRequest)) {
            const saveData = []
            for(const request of specialRequest) {
                const newSpecial = new specialOffProduct();
                newSpecial.productId = request.productId;
                const saveSpecial: any = await newSpecial.save();
                saveData.push(saveSpecial)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new special !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new special !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            console.log('specialddddd')
            const newSpecial = new specialOffProduct();
            newSpecial.productId = specialRequest.productId;
            const saveSpecial: any = await newSpecial.save();
            if (saveSpecial) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new special !!',
                    data: saveSpecial
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new special !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get special list
    // @Authorized()
    @Get()
    public async getSpecial(@Res() response: any): Promise<any> {
        const specialData = await specialOffProduct.find().then(async(value) => {
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
                message: 'Successfully get the special list !!',
                data: specialData
            };
            return response.status(200).send(successResponse);
    }

    // update special API
    @Put('/:id')
    public async updateSpecial(@Param('id') id: string, @Body({validate: true}) specialRequest: any, @Res() response: any): Promise<any> {
        const ifSpecial = await specialOffProduct.findOne({_id: id});
        if (!ifSpecial) {
            return response.status(400).send({status: 0, message: 'Invalid Special Id !!'});
        }
        ifSpecial.productId = specialRequest.productId;
        const updateSpecial = await ifSpecial.save();
        if (updateSpecial) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Special !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the special !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async specialDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifSpecial = await specialOffProduct.findOne({_id: id});
        if (!ifSpecial) {
            return response.status(400).send({status: 0, message: 'Unable to get the special detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the special detail',
            data: ifSpecial
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteSpecial(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifSpecial = await specialOffProduct.findOne({_id: id});
        if (!ifSpecial) {
            return response.status(400).send({status: 0, message: 'Inlid Special is !!'});
        }
        const deleteSpecial = await specialOffProduct.deleteOne({_id: id});
        if (deleteSpecial) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Special !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Special !!'});
    }
}
