
class Action {

    static instance;

    /**
     * Default namespace of the action
     *
     * @type {string}
     */
    namespace = "global";

    /**
     * Singleton of service
     *
     * @returns {Action}
     */
    static getInstance() {
        if(!this.instance) {
            this.instance = new this;
        }

        return this.instance;
    }

    /**
     * Dispatch with the defined namespace
     * @param {string} type
     * @param {*} data
     * @returns {{type: string, payload: *}}
     */
    dispatch(type, data = null) {
        if(/^\w+\.\w+$/.test(type)) {
            return {type: type, payload: data};
        }

        return {type: `${this.namespace}.${type}`, payload: data};
    }
}

export default Action;