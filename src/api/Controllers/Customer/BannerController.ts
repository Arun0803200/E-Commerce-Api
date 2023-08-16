import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { banner } from '../../Models/BannerModel';
const bcrypt = require('bcrypt');
@JsonController('/banner')
export class bannerController {
    constructor() {}

    // create banner
    @Post()
    public async createBanner(@Body({validate: true}) bannerRequest: any, @Res() response: any): Promise<any> {
        const newBanner = new banner();

        newBanner.image = bannerRequest.image;
        newBanner.title = bannerRequest.title;
        newBanner.descriptions = bannerRequest.descriptions;
        const saveBanner: any = await newBanner.save();
        if (saveBanner) {
            const successResponse = {
                status: 1,
                message: 'Created a new banner !!',
                data: saveBanner
            }
            return response.status(200).send(successResponse)
        }
        const errorResponse = {
            status: 0,
            message: 'Unable to create a new banner !!'
        }
        return response.status(400).send(errorResponse);
    }

    // get banner list
    // @Authorized()
    @Get()
    public async getBanner(@Res() response: any): Promise<any> {
        const bannerData = await banner.find().limit(2);
            const successResponse = {
                status: 1,
                message: 'Successfully get the banner list !!',
                data: bannerData
            };
            return response.status(200).send(successResponse);
    }

    // update banner API
    @Put('/:id')
    public async updateBanner(@Param('id') id: string, @Body({validate: true}) bannerRequest: any, @Res() response: any): Promise<any> {
        const ifBanner = await banner.findOne({_id: id});
        if (!ifBanner) {
            return response.status(400).send({status: 0, message: 'Invalid Banner Id !!'});
        }
        ifBanner.image = bannerRequest.image;
        ifBanner.title = bannerRequest.title;
        ifBanner.descriptions = bannerRequest.descriptions;
        const updateBanner = await ifBanner.save();
        if (updateBanner) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Banner !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the banner !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async bannerDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBanner = await banner.findOne({_id: id});
        if (!ifBanner) {
            return response.status(400).send({status: 0, message: 'Unable to get the banner detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the banner detail',
            data: ifBanner
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteBanner(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifBanner = await banner.findOne({_id: id});
        if (!ifBanner) {
            return response.status(400).send({status: 0, message: 'Inlid Banner is !!'});
        }
        const deleteBanner = await banner.deleteOne({_id: id});
        if (deleteBanner) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Banner !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Banner !!'});
    }
}
