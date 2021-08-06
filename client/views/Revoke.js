let m = require("mithril");

let ListCredentials = require('./ListCredentials')

let Revoke = {
    view: function () {
        return m("main", [
            m("div",
                [
                    m("div", {"class": "w3-container"},
                        m(ListCredentials)
                    ),
                ]
            )
        ])
    }
};

module.exports = Revoke;