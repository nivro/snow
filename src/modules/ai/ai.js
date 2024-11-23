const BaseModule = require('../base/base')


class AI extends BaseModule {
    static helpMessage = `AI`
    constructor(authentication) {
        super()
        this.authentication = authentication
        this.commands = {
            'image': (request) => this.generateImage(request),
        };
        this.generateImage('hello')
    }

    generateImage(request) {
        this.doIt(request)
    }

    async doIt(request) {

    }

}

module.exports = AI;