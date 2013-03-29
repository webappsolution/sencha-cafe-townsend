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
 * The list of employees view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.extjs.EmployeeListView", {
    extend: "Ext.Panel",
    alias: "widget.employeeListView",
    controller: "CafeTownsend.mediator.extjs.EmployeeListMediator",
    header: false,

    requires: [
        "Ext.data.*",
        "Ext.util.*",
        "Ext.view.View",
        "CafeTownsend.view.extjs.component.LiveSearchGridPanel",
        "nineam.locale.LocaleManager"
    ],

    layout: {
        type: "fit"
    },

    items: [
        {
            xtype: "toolbar",
            width: 400,

            items: [
                {
                    itemId: "logoutButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.logOff"
                        }
                    ]
                },
                {
                    xtype: "tbfill"
                },
                {
                    xtype: "label",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.title"
                        }
                    ]

                },
                {
                    xtype: "tbfill"
                },
                {
                    itemId: "newEmployeeButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.new"
                        }
                    ]
                }
            ]
        },
        {
            xtype: "livesearchgridpanel",
            store: null,
            itemId: "list",
            forceFit: true,
            autoScroll: true,
            height: 300,
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    dataIndex:  "firstName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.firstName"
                        }
                    ]
                },
                {
                    dataIndex:  "lastName",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeList.lastName"
                        }
                    ]
                }
            ],
            plugins: [
                {
                    ptype: "localization",
                    method: "setTitle",
                    key: "employeeList.search"
                }
            ]
        }
    ]
});
