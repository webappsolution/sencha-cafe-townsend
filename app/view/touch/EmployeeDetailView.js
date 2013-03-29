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
    controller: "CafeTownsend.mediator.touch.EmployeeDetailMediator",

    requires: [
        "Ext.form.FieldSet",
        "Ext.Toolbar"
    ],

    config: {

        items: [
            {
                xtype: "titlebar",
                docked: "top",
                plugins: [
                    {
                        type: "localization",
                        method: "setTitle",
                        key: "employeeDetail.title"
                    }
                ],
                items: [
                    {
                        xtype: "button",
                        itemId: "backButton",
                        align: "left",
                        plugins: [
                            {
                                type: "localization",
                                method: "setText",
                                key: "employeeDetail.back"
                            }
                        ]
                    },
                    {
                        xtype: "button",
                        itemId: "saveEmployeeButton",
                        align: "right",
                        ui: "action",
                        plugins: [
                            {
                                type: "localization",
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
                                type: "localization",
                                method: "setPlaceHolder",
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
                                type: "localization",
                                method: "setPlaceHolder",
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
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "employeeDetail.phoneNumber"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "deleteButton",
                align: "center",
                ui: "action",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "employeeDetail.delete"
                    }
                ]
            }
        ]
    }
});