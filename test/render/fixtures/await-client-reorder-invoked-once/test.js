const extend = require("raptor-util/extend");
const expect = require("chai").expect;

exports.templateData = {
    outer: Promise.resolve(),
    inner1: Promise.resolve(),
    inner2: Promise.resolve()
};

exports.checkEvents = function(events, snapshot, out) {
    // Expect that we invoked the await reorderer. If true, it was only able to
    // be invoked once.
    expect(out.global.__awaitReordererInvoked).to.equal(true);

    events = events.map(function(eventInfo) {
        var arg = extend({}, eventInfo.arg);
        expect(arg.out != null).to.equal(true);

        delete arg.out; // Not serializable
        delete arg.asyncValue; // Not serializable

        return {
            event: eventInfo.event,
            arg: arg
        };
    });

    snapshot(events, out.isVDOM ? "-events-vdom.json" : "-events.json");
};

exports.skip_vdom = "client-reorder/placeholders are not supported in vdom";
