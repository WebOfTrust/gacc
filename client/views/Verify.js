let m = require("mithril");

let PresentationRequest = require('./PresentationRequest')

let Verify = {
    view: function () {
        return m("main", [
            m(PresentationRequest)
        ])
    }
};

module.exports = Verify;