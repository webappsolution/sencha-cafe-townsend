describe("SenchaExtensions.mvc.store.AbstractStore", function() {

    //reusable scoped variable
    var store = null;

    //setup/teardown
    beforeEach(function() {
        //create a fresh grid for every test to avoid test pollution
        store = Ext.create("SenchaExtensions.mvc.store.AbstractStore");
    });

    afterEach(function() {
        //destroy the grid after every test so we don't pollute the environment
        store = null;
    });

    describe("setData() method", function() {

        it("should be a function", function() {
            console.log("BMR----------------");
            console.log(typeof store.setData);
            expect(typeof store.setData).toEqual("function");
        });

//        it("should return a string", function() {
//            expect(typeof SenchaExtensions.mvc.store.AbstractStore.getUsersUrl()).toEqual("string");
//        });
//
//        it("should correctly encode the event ID", function() {
//            var regExp = /event_id=12345/g;
//            var eventId = 12345;
//            var url = SenchaExtensions.mvc.store.AbstractStore.getUsersUrl(eventId);
//
//            expect(regExp.test(url)).toEqual(true);
//        });

    });

//    describe("getPastEventsUrl() method", function() {
//
//        it("should be a function", function() {
//            expect(typeof SenchaExtensions.mvc.store.AbstractStore.getPastEventsUrl).toEqual("function");
//        });
//
//        it("should return a string", function() {
//            expect(typeof SenchaExtensions.mvc.store.AbstractStore.getPastEventsUrl()).toEqual("string");
//        });
//
//    });
//
//    describe("getUpcomingEventsUrl() method", function() {
//
//        it("should be a function", function() {
//            expect(typeof SenchaExtensions.mvc.store.AbstractStore.getUpcomingEventsUrl).toEqual("function");
//        });
//
//        it("should return a string", function() {
//            expect(typeof SenchaExtensions.mvc.store.AbstractStore.getUpcomingEventsUrl()).toEqual("string");
//        });
//
//    });

});