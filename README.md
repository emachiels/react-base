## React base
version 1.0.2

### TL;DR
React base offers a bootstrap project including React-redux ant yahoo-intl for quickly starting a new project. It aims to reduce code duplication and improve readability of the features provided by React-redux and reusage of reducers and actions.

###Introduction
React and especially redux has a steep learning curve and is hard to understand, which makes it hard to use it. In order to make life easier and to get started more quickly, React base comes as a solution..

### Core functionalities
* Pre-defined map structure for easy organising your project
* Method called reducer types
* Action namespaces
* Global reducer state and methods
* Reducer namespaces

### Example 
For a clear understanding the way React base works, an example notification feature is provided.  

Actions
```javascript
import Action from "./Action";


class NotificationAction extends Action {

    constructor() {
        super();

        this.namespace = "notifications";
    }

    /**
    * Clear all or a specific notification
    * 
    * @param index
    * @param dispatch
    */
    clear(index = null, dispatch) {
        dispatch(this.dispatch('notifications.clear', {index}))
    }
}

export default NotificationAction;
```

Reducer
```javascript
import Reducer from "./Reducer";

class NotificationReducer extends Reducer {

    initialState = {
        all: []
    };

    static namespace = "notifications";
    
    /**
    * Add notification to the notification array
    * 
    * @param level
    * @param message
    * @param state
    * @returns {{all: *[]}}
    * @private
    */
    _show(level, message, state) {
        return {
            all: [
                ...state.all,
                {type: level, message: message, index: state.all.length}
            ]
        }
    }
    
    /**
    * Shortcut for adding a danger alert
    * @param action
    * @param state
    * @returns {{all: *[]}}
    */
    danger(action, state) {
        return this._show("danger", action.payload, state)
    }

    /**
     * Clears all or a specific notification
     * 
     * @param action
     * @param state
     * @returns {{all: Array}}
     */
    clear(action, state) {
        let index = action.payload && action.payload.index ? 
                    state.all.indexOf(action.payload.index) : 
                    -1;

        if(index > -1) {
            state.all.splice(index, 1);

            return {
                all: state.all
            }
        }

        return {
            all: []
        }
    }
}

export default NotificationReducer;
```
which is added in the rootreducer (app/reducers/index.js)
```javascript
import { combineReducers } from "redux";
import NotificationReducer from "./NotificationReducer";

export default combineReducers({
    notification: (...args) => new NotificationReducer().call(...args),
})
```
A lambda expression is used in the rootreducer because the scope should lie in the Reducer, not within Redux, which is the case by default.

The notification action can now be called within another action like so:
```javascript
dispatch(this.dispatch("notifications.danger", "Danger message"));
```

And all the notifications can be stored in the props of a component using, where `mapStateToProps` is added to the global redux state as usual:

```javascript
function mapStateToProps(state) {
    return {
        auth: state.auth,
        notifications: state.notifications.all
    }
}
```
and used within the component like:
```javascript
{this.props.notifications.length ? this.props.notifications.map((notification, i) =>
    <Notification type={notification.type} index={notification.index} key={i} isDismissable={true}>
        {notification.message}
    </Notification>) :
null}
```
Happy hacking!
