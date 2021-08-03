let m = require("mithril");

let Recipient = {
    view: function () {
        return m("div", {"class": "w3-container w3-margin-bottom"}, [
            m("label", "Recipient: (Han)"),
            m("input[readonly=true][value=EhYpYZSUAtiEurF7XngDB2mII2khY9ktlfqKHd1NHfNY]", {
                "class": "w3-input w3-border w3-light-grey",
                "type": "text"
            })
        ])
    }
}

module.exports = Recipient;