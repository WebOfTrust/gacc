let m = require("mithril");

let PresentationRequest = require('./PresentationRequest')
let Mailbox = require('./Mailbox')

let Verify = {
    view: function () {
        return m("main", [
            m("div", {"class": "w3-row"},
                [
                    m("div", {"class": "w3-container w3-col s6"},
                        m(PresentationRequest)
                    ),
                    m("div", {"class": "w3-container w3-col s6"},
                        m(Mailbox)
                    )
                ]
            )
        ])
    }
};

module.exports = Verify;