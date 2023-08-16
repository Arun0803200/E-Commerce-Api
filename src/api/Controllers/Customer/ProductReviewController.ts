import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { productReview } from '../../Models/ProductReviewModel';
@JsonController('/review')
export class ReviewController {
    constructor() {}

    // create review
    @Post()
    public async createReview(@Body({validate: true}) reviewRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(reviewRequest)) {
            const saveData = []
            for(const request of reviewRequest) {
                const newReview = new productReview();
                newReview.productId = request.productId;
                newReview.review = request.review;
                newReview.customerId = request.customerId;
                const saveReview: any = await newReview.save();
                saveData.push(saveReview)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new review !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new review !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            const newReview = new productReview();
            newReview.productId = reviewRequest.productId;
            newReview.review = reviewRequest.review;
            newReview.customerId = reviewRequest.customerId;
            const saveReview: any = await newReview.save();
            if (saveReview) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new review !!',
                    data: saveReview
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new review !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get review list
    // @Authorized()
    @Get()
    public async getReview(@Res() response: any): Promise<any> {
        const reviewData = await productReview.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the review list !!',
                data: reviewData
            };
            return response.status(200).send(successResponse);
    }

    // update review API
    @Put('/:id')
    public async updateReview(@Param('id') id: string, @Body({validate: true}) reviewRequest: any, @Res() response: any): Promise<any> {
        const ifReview = await productReview.findOne({_id: id});
        if (!ifReview) {
            return response.status(400).send({status: 0, message: 'Invalid Review Id !!'});
        }
        ifReview.productId = reviewRequest.productId;
        ifReview.review = reviewRequest.review;
        ifReview.customerId = reviewRequest.customerId;
        const updateReview = await ifReview.save();
        if (updateReview) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Review !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the review !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async reviewDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifReview = await productReview.findOne({_id: id});
        if (!ifReview) {
            return response.status(400).send({status: 0, message: 'Unable to get the review detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the review detail',
            data: ifReview
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteReview(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifReview = await productReview.findOne({_id: id});
        if (!ifReview) {
            return response.status(400).send({status: 0, message: 'Inlid Review is !!'});
        }
        const deleteReview = await productReview.deleteOne({_id: id});
        if (deleteReview) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Review !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Review !!'});
    }
}
