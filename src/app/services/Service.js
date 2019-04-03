class Service {

    /**
     * Singleton instance of the called object
     *
     * @type {Service}
     */
    static instance;

    static getInstance() {
        if(!this.instance) {
            this.instance = new this;
        }

        return this.instance;
    }

}

export default Service;