/*
 Copyright (c) 2013 [Web App Solution, Inc.](mailto:admin@webappsolution.com)

 CafeTownsend Sencha Touch DeftJS PoC is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 CafeTownsend Sencha Touch DeftJS PoC is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with CafeTownsend Sencha Touch DeftJS PoC.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The basic Viewport for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.extjs.Viewport", {
    extend: "Ext.container.Viewport",
    alias: "widget.viewport",
    controller: "CafeTownsend.mediator.extjs.ViewportMediator",
    width: 800,

    requires: [
        "CafeTownsend.view.extjs.LoginView",
        "CafeTownsend.view.extjs.EmployeeListView",
        "CafeTownsend.view.extjs.EmployeeDetailView"
    ],

    config: {
        width: 800,
        currentItem: null
    },

    layout: {
        align: "center",
        pack: "center",
        type: "vbox"
    },

    items: [
        {
            xtype: "loginView",
            itemId: "login",
            hidden: false
        },
        {
            xtype: "employeeListView",
            itemId: "emplist",
            hidden: true
        },
        {
            xtype: "employeeDetailView",
            itemId: "empdetaiil",
            hidden: true
        }
    ],

    // TODO: BMR: Remove all logic from views
    setView: function(view) {
        console.log("Viewport.setView: " + view);
        //this.getView().items.getAt(1).show();
        for ( var i=0; i<this.items.length; i++)
        {
            var id = this.items.getAt(i).getItemId();
            if (id == view)
            {
                this.items.getAt(i).show();
            } else {
                this.items.getAt(i).hide();
            }
        }
    }

}, function() {
    this.getCurrentItem = "login";
    console.log("viewport create, currentitem = " + this.getCurrentItem);
});


