class Reducer {

    /**
     * Global state applicable for every reducer
     *
     * @type {{pending: boolean}}
     */
    static initialState = {
        pending: false,
    };

    call(state, action) {

        if(!state) {
            state = {...Reducer.initialState, ...this.initialState};
        }

        if(action.type) {
            let reduceAction = action.type.split(".");

            if(reduceAction[0] === this.constructor.namespace && this[reduceAction[1]]) {
                let reducedState = this[reduceAction[1]].call(this, action.payload, state);
                return {...state, ...reducedState};
            }
        }

        return state;
    }

    /**
     * Fired when action is loading
     *
     * @returns {{pending: boolean}}
     */
    pending() {
        return {pending: true};
    }

    /**
     * Fired when an action is stopped loading
     *
     * @returns {{pending: boolean}}
     */
    impending() {
        return {pending: false};
    }
}

export default Reducer;