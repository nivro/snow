const process = require('process');
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
        try {
            this.logger.info(`sending image request to ai with prompt: ${request}`)
            const response = await this.ai.images.generate({
                model: this.config.image.model,
                prompt: request,
                n: 1,
                size: this.config.image.size,
            });
            const url = response.data[0].url
            this.logger.info(`image response url: ${url}`)
            const image = await fetch(url);
            const buffer = await image.buffer();
            const media = new MessageMedia('image/png', buffer.toString('base64'), 'generated-image.png');
            return media

        } catch (error) {
            this.logger.error(`error cought in generate image ${error}`)
            return "error appeared when trying to generate image"
        }

    }


}

module.exports = AI;