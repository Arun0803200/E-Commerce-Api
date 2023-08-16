import 'reflect-metadata';
import { JsonController, Post, Body, Res, Get, QueryParam, Put, Param, Delete } from "routing-controllers";
import { language } from '../../Models/LanguageModel';
@JsonController('/language')
export class LanguageController {
    constructor() {}

    // create language
    @Post()
    public async createLanguage(@Body({validate: true}) languageRequest: any, @Res() response: any): Promise<any> {
        if (Array.isArray(languageRequest)) {
            const saveData = []
            for(const request of languageRequest) {
                const searchCondition = [];
                if (request.languageCode) {
                    searchCondition.push({
                        languageCode: {$regex : request.languageCode, $options : 'i'}
                    });
                }
                if (request.languageName) {
                    searchCondition.push({
                        languageName: {$regex : request.languageName, $options : 'i'}
                    });
                }
                let findOperation: any = {};
                if (searchCondition.length > 0) {
                    findOperation = {
                        $or: searchCondition
                    }
                }
                const findLanguage = await language.findOne(findOperation);
                console.log(findLanguage, 'findLanguagefindLanguage')
                if (findLanguage) {
                    return response.status(400).send({status: 0, message: 'duplicate values occurs !!'})
                }
                const newLanguage = new language();
                newLanguage.languageName = request.languageName;
                newLanguage.languageCode = request.languageCode;
                const saveLanguage: any = await newLanguage.save();
                saveData.push(saveLanguage)
            }
            if (saveData) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new language !!',
                    data: saveData
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new language !!'
            }
            return response.status(400).send(errorResponse);
        } else {
            const searchCondition = [];
                if (languageRequest.languageCode) {
                    searchCondition.push({
                        languageCode: {$regex : languageRequest.languageCode, $options : 'i'}
                    });
                }
                if (languageRequest.languageName) {
                    searchCondition.push({
                        languageName: {$regex : languageRequest.languageName, $options : 'i'}
                    });
                }
                let findOperation: any = {};
                if (searchCondition.length > 0) {
                    findOperation = {
                        $or: searchCondition
                    }
                }
                const findLanguage = await language.findOne(findOperation);
            if (findLanguage) {
                    return response.status(400).send({status: 0, message: 'A duplicate value occurs !!'})
                }
            const newLanguage = new language();
            newLanguage.languageName = languageRequest.languageName;
            newLanguage.languageCode = languageRequest.languageCode;
            const saveLanguage: any = await newLanguage.save();
            if (saveLanguage) {
                const successResponse = {
                    status: 1,
                    message: 'Created a new language !!',
                    data: saveLanguage
                }
                return response.status(200).send(successResponse)
            }
            const errorResponse = {
                status: 0,
                message: 'Unable to create a new language !!'
            }
            return response.status(400).send(errorResponse);
        }
    }

    // get language list
    // @Authorized()
    @Get()
    public async getLanguage(@Res() response: any): Promise<any> {
        const languageData = await language.find();
            const successResponse = {
                status: 1,
                message: 'Successfully get the language list !!',
                data: languageData
            };
            return response.status(200).send(successResponse);
    }

    // update language API
    @Put('/:id')
    public async updateLanguage(@Param('id') id: string, @Body({validate: true}) languageRequest: any, @Res() response: any): Promise<any> {
        const ifLanguage = await language.findOne({_id: id});
        if (!ifLanguage) {
            return response.status(400).send({status: 0, message: 'Invalid Language Id !!'});
        }
        ifLanguage.languageName = languageRequest.languageName;
        ifLanguage.languageCode = languageRequest.languageCode;
        const updateLanguage = await ifLanguage.save();
        if (updateLanguage) {
            const successResponse = {
                status: 1,
                message: 'Successfully update the Language !!'
            }
            return response.status(200).send(successResponse);
        }
        return response.status(400).send({status: 0, message: 'Unable to update the language !!'});
    }

    // Detail api
    @Get('/detail/:id')
    public async languageDetail(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifLanguage = await language.findOne({_id: id});
        if (!ifLanguage) {
            return response.status(400).send({status: 0, message: 'Unable to get the language detail !!'});
        }
        const successExample = {
            status: 1,
            message: 'Successfully got the language detail',
            data: ifLanguage
        }
        return response.status(200).send(successExample);
    }

    //Delete Api
    @Delete('/:id')
    public async deleteLanguage(@Param('id') id: string, @Res() response: any): Promise<any> {
        const ifLanguage = await language.findOne({_id: id});
        if (!ifLanguage) {
            return response.status(400).send({status: 0, message: 'Inlid Language is !!'});
        }
        const deleteLanguage = await language.deleteOne({_id: id});
        if (deleteLanguage) {
            const successExample = {
                status: 1,
                message: "Successfully deleted a Language !!",
            }
            return response.status(200).send(successExample);
        }
        return response.status(400).send({status:0, message: 'Unable to deleted a Language !!'});
    }
}
