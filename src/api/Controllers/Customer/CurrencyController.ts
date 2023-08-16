import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { currency } from '../../Models/CurrencyModel';
@JsonController('/currency')
export class CurrencyController {
    constructor() {}

    // create currency
    @Post()
    public async createCurrency(@Body({validate: true}) currencyRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(currencyRequest)) {
            const saveData = []
            for(const request of currencyRequest) {
                const searchCondition = [];
                if (request.currencyCode) {
                    searchCondition.push({
                        currencyCode: {$regex : request.currencyCode, $options : 'i'}
                    });
                }
                if (request.currencyName) {
                    searchCondition.push({
                        currencyName: {$regex : request.currencyName, $options : 'i'}
                    });
                }
                let findOperation: any = {};
                if (searchCondition.length > 0) {
                    findOperation = {
                        $or: searchCondition
                    }
                }
                const findCurrency = await currency.findOne(findOperation);
                if (findCurrency) {
                    return response.status(400).send({status: 0, message: 'duplicate values occurs !!'})
                }
                const newCurrency = new currency();
                newCurrency.currencyName = request.currencyName;
                newCurrency.currencyCode = request.currencyCode;
                newCurrency.symbol = request.symbol;
                const saveCurrency: any = await newCurrency.save();
                saveData.push(saveCurrency)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new currency !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new currency !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            const searchCondition = [];
                if (currencyRequest.currencyCode) {
                    searchCondition.push({
                        currencyCode: {$regex : currencyRequest.currencyCode, $options : 'i'}
                    });
                }
                if (currencyRequest.currencyName) {
                    searchCondition.push({
                        currencyName: {$regex : currencyRequest.currencyName, $options : 'i'}
                    });
                }
                let findOperation: any = {};
                if (searchCondition.length > 0) {
                    findOperation = {
                        $or: searchCondition
                    }
                }
                const findCurrency = await currency.findOne(findOperation);
                if (findCurrency) {
                    return response.status(400).send({status: 0, message: 'A duplicate value occurs !!'})
                }
            const newCurrency = new currency();
            newCurrency.currencyName = currencyRequest.currencyName;
            newCurrency.currencyCode = currencyRequest.currencyCode;
            newCurrency.symbol = currencyRequest.symbol;
            const saveCurrency: any = await newCurrency.save();
            if (saveCurrency) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new currency !!',
                    data: saveCurrency
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new currency !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get currency list
    // @Authorized()
    @Get()
    public async getCurrency(@Res() response: any): Promise<any> {
        const currencyData = await currency.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the currency list !!',
                data: currencyData
            };
            return response.status(200).send(successResponse);
    }

    // update currency API
    @Put('/:id')
    public async updateCurrency(@Param('id') id: string, @Body({validate: true}) currencyRequest: any, @Res() response: any): Promise<any> {
        const ifCurrency = await currency.findOne({_id: id});
        if (!ifCurrency) {
            return response.status(400).send({status: 0, message: 'Invalid Currency Id !!'});
        }
        
        ifCurrency.currencyName = currencyRequest.currencyName;
        ifCurrency.currencyCode = currencyRequest.currencyCode;
        ifCurrency.symbol = currencyRequest.symbol;
        const updateCurrency = await ifCurrency.save();
        if (updateCurrency) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Currency !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the currency !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async currencyDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifCurrency = await currency.findOne({_id: id});
        if (!ifCurrency) {
            return response.status(400).send({status: 0, message: 'Unable to get the currency detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the currency detail',
            data: ifCurrency
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteCurrency(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifCurrency = await currency.findOne({_id: id});
        if (!ifCurrency) {
            return response.status(400).send({status: 0, message: 'Inlid Currency is !!'});
        }
        const deleteCurrency = await currency.deleteOne({_id: id});
        if (deleteCurrency) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Currency !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Currency !!'});
    }
}
