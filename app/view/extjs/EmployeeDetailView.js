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
 * The employee details view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.touch.EmployeeDetailView", {
    extend: "Ext.form.Panel",
    alias: "widget.employeeDetailView",
    controller: "CafeTownsend.mediator.extjs.EmployeeDetailMediator",
    submitEmptyText: false,

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

    items: [
        {
            xtype: "toolbar",
//            title: "Employee",
            docked: "top",
            width: 400,

            items: [
                {
                    itemId: "backButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeDetail.back"
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
                            method: "setTitle",
                            key: "employeeDetail.title"
                        }
                    ]
                },
                {
                    xtype: "tbfill"
                },
                {
                    itemId: "saveEmployeeButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeDetail.save"
                        }
                    ]
                }
            ]
        },
        {
            xtype: "fieldset",
            itemId: "fieldset",
            items: [
                {
                    xtype: "textfield",
                    itemId: "firstNameTextField",
                    name: "firstName",
                    required: true,
                    plugins: [
                        {
                            ptype: "localization",
                            method: "emptyText",
                            key: "employeeDetail.firstName"
                        }
                    ]
                },
                {
                    xtype: "textfield",
                    itemId: "lastNameTextField",
                    name: "lastName",
                    required: true,
                    plugins: [
                        {
                            ptype: "localization",
                            method: "emptyText",
                            key: "employeeDetail.lastName"
                        }
                    ]
                },
                {
                    xtype: "textfield",
                    itemId: "phoneNumberTextField",
                    name: "phoneNumber",
                    required: true,
                    plugins: [
                        {
                            ptype: "localization",
                            method: "emptyText",
                            key: "employeeDetail.phoneNumber"
                        }
                    ]
                }
            ]
        },
        {
            xtype: "toolbar",
            items: [
                {
                    itemId: "deleteButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "employeeDetail.delete"
                        }
                    ]
                }
            ]

        }
    ]
});