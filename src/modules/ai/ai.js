const BaseModule = require('../base/base')
const { MessageMedia } = require("whatsapp-web.js");
const fetch = require("node-fetch");
require('dotenv').config()
const openai = require("openai")

class AI extends BaseModule {
    static helpMessage = `AI
image <request>`
    constructor(config) {
        super()
        this.config = config
        this.ai = new openai.OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        this.commands = {
            'image': (request) => this.generateImage(request),
        };
    }

    async generateImage(request) {
        this.logger.info(`sending image request to ai with prompt: ${request}`)
        const response = await this.ai.images.generate({
            model: this.config.image.model,
            prompt: request,
            n: 1,
            size: this.config.image.size,
        });
        this.logger.info('got response for openai image request')
        const url = response.data[0].url
        const prompt = response.data[0].revised_prompt

        const image = await fetch(url);
        const buffer = await image.buffer();
        const media = new MessageMedia('image/png', buffer.toString('base64'), 'generated-image.png');
        return media
    }


}

module.exports = AI;