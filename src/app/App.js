import React, {Component} from 'react';
import {Provider} from "react-redux";
import {IntlProvider} from "react-intl";

import store from "./utils/store";
import {language, messages} from "./utils/language";
import {history} from "./utils/history";
import {routes} from "./utils/routing/routes";
import moment from "moment";
import {Router} from "react-router-dom";

class App extends Component {
    componentDidMount() {
        moment.locale(language);

        if(messages && messages["defaults.datetime.format"]) {
            moment.defaultFormat = messages["defaults.datetime.format"]
        }
    }

    render() {
        return (
            <Provider store={store}>
                <IntlProvider locale={language} messages={messages} textComponent={React.Fragment}>
                    <Router history={history}>
                        {routes}
                    </Router>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
