/*
 Copyright (c) 2013 [Sencha Extensions Contributors](mailto:admin@webappsolution.com)

 WASI Sencha Extensions is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WASI Sencha Extensions is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with WASI Sencha Extensions.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The abstract store classes provides additional base functionality to update records in the store and
 * force auto syncs.
 * 
 * This file is part of WASI Sencha Extensions.
 */
Ext.define("SenchaExtensions.mvc.store.AbstractStore", {
    extend: "Ext.data.Store",

    statics: {

        /**
         * The logger for the object.
         */
        logger: SenchaExtensions.logger.Logger.getLogger("SenchaExtensions.mvc.store.AbstractStore")
    },

    isAutoUpdate: false,
    _selectedRecord: null,

    /**
     * @event selectedRecord
     * Fired when a Model instance has been set as the selected record of Store. You should listen
     * for this event if you have to update a representation of the selected record in this store in your UI.
     * @param {Ext.data.Store} this The store.
     * @param {Ext.data.Model} record The Model instance that is set as the selected record.
     */

    /**
     * Set the
     *
     * @param data
     */
    setSelectedRecord: function(record) {
        SenchaExtensions.mvc.store.AbstractStore.logger.debug("setSelectedRecord");

        this._selectedRecord = record;
        this.fireEvent("selectedRecord", this, record);
    },

    /**
     * TODO
     *
     * @param data
     */
    getSelectedRecord: function() {
        SenchaExtensions.mvc.store.AbstractStore.logger.debug("getSelectedRecord");

        return this._selectedRecord;
    },

    /**
     * This method exists to create parity between the ExtJS and Touch SDKs, as ExtJS does not hgve a setData() method.
     *
     * @param {Object[]/Ext.data.Model[]} data
     * Array of Model instances or data objects to load locally. See "Inline data" above for details.
     */
    setData: function(data) {

        if (Ext.getVersion("extjs")) {
            SenchaExtensions.mvc.store.AbstractStore.logger.info("setData: using 'store.removeAll() and store.add(data)' because ExtJS 4.1 doesn't support store.setData().");
            this.removeAll();
            if ( data )
            {
                this.add(data);
            } else {
                this.removeAll();
            }
        } else {
            SenchaExtensions.mvc.store.AbstractStore.logger.info("setData");
            this.callParent(arguments);
        }
    },

    /**
     * Update a model object on the store by replacing it with a new model
     *
     * @param {Object} model - model to replace existing model in store.
     * @param {String} property - property to use to find model to be replaced.
     */
    update: function(model, property) {
        property = property ? property : "id";

        if (Ext.getVersion("extjs")) {
            var index = this.find(property, model.get(property));

            if(index < 0)
                return;

            this.insert(index, model);
            this.removeAt(index+1);
            SenchaExtensions.mvc.store.AbstractStore.logger.debug("update: updating ExtJS model with " + property);
        } else {
            var value = model.data[property];
            var record = this.findRecord(property, value);
            if(record) {
//                record.setData(model);
                record = model;
                // force the store to update correctly and broadcast refresh events
                // so views using this store update correctly
                record.dirty = true;
                this.sync();
                SenchaExtensions.mvc.store.AbstractStore.logger.debug("update: updating Touch model with " + property);
            }
        }
    }

    /**
     * Updates Model instance to the Store. This method accepts either:
     *
     * - An array of Model instances or Model configuration objects.
     * - Any number of Model instance or Model configuration object arguments.
     *
     * The new Model instances will be added at the end of the existing collection.
     *
     * Sample usage:
     *
     *     myStore.add({some: 'data2'}, {some: 'other data2'});
     *
     * @param {Ext.data.Model[]/Ext.data.Model...} model An array of Model instances
     * or Model configuration objects, or variable number of Model instance or config arguments.
     * @param {String} The name of the ID property for the model.
     * @return {Ext.data.Model[]} The model instances that were updated.
     */
//    update: function(newModel, idProperty) {
//
//        if(idProperty == null) {
//            idProperty = "id";
//        }
//
//        if(newModel.id == null) {
//            throw new Error(
//                "The model being updated must have an 'id' property matching the provided parameter: '" +
//                idProperty +
//                "'.");
//        }
//
//        var id = newModel[idProperty];
//        var record = this.findRecord(idProperty, id);
//
//        //the copyFrom method requires the persistanceProperty be set, default is data, and that the data property be set
//        // which needs to be the actual model. This is a private method so mmv.
//        if (Ext.getVersion("extjs")) {
//            newModel.id = record.id;
//            newModel.data = newModel;
//            newModel.persistenceProperty = newModel['persistenceProperty'] ? newModel['persistenceProperty'] : 'data';
//            record.copyFrom(newModel);
//        } else {
//            record.setData(newModel);
//        }
//
////
//
//        // TODO: we may not always want to do this
//        // seems like both the dirty flag and sync need to be manually called for the update to really take place
////        if(this.isAutoUpdate && (Ext.getVersion("extjs") == false) ) {
////            SenchaExtensions.mvc.store.AbstractStore.logger.debug("update: BMR ============");
////            record.dirty = true;
////            this.sync();
////        }
//
//        SenchaExtensions.mvc.store.AbstractStore.logger.debug("update: updating item with id = %s", id);
//        return record;
//    },

//    /**
//             * Update a model object on the store by replacing it with a new model
//             *
//             * @param {Object} model - model to replace existing model in store
//             * @param {String} property - property to use to find model to be replaced
//             */
//    update: function(model, property) {
//        property = property ? property : 'id';
//
//        var index = this.find(property, model.get(property));
//        var records = this.getRange();
//        records.splice(index, 1, model);
//
//        this.removeAll();
//        this.add(records);
//    }

});