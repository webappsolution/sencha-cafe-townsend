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
 * The basic login view for the application.
 *
 * <p>
 * All views are purely layout and don't contain event handling,
 * application or business logic; this is all done in the view"s corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.extjs.LoginView", {
    extend: "Ext.Container",
    alias: "widget.loginView",
    controller: "CafeTownsend.mediator.extjs.LoginMediator",

    layout: {
        type: "vbox",
        pack: "center",
        align: "center"
    },

    items: [
        {
            xtype: "form",
            plugins: [
                {
                    ptype: "localization",
                    method: "setTitle",
                    key: "login.title"
                }
            ],

            frame: true,
            bodyPadding: "5px 5px 0",
            width: 350,
            fieldDefaults: {
                labelWidth: 125,
                msgTarget: "side",
                autoFitErrors: false
            },
            defaults: {
                width: 300,
                inputType: "password"
            },
            defaultType: "textfield",

            buttons: [
                {
                    id:"logInButton",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "login.submit"
                        }
                    ]
                }
            ],

            items: [
                {
                    itemId: "usernameTextField",
                    inputType: "text",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setFieldLabel",
                            key: "login.username"
                        }
                    ]
                },
                {
                    itemId: "passwordTextField",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setFieldLabel",
                            key: "login.password"
                        }
                    ]
                },
                {
                    xtype: "label",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "login.passwordHint"
                        }
                    ]
                },
                {
                    xtype: "label",
                    itemId: "signInFailedLabel",
                    hidden: true,
                    hideAnimation: "fadeOut",
                    showAnimation: "fadeIn",
                    style: "color:#990000;margin:5px 0px;",
                    plugins: [
                        {
                            ptype: "localization",
                            method: "setText",
                            key: "login.loginFailed"
                        }
                    ]
                }
            ]
        }

    ]
});


