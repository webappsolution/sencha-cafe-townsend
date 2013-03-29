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
 * application or business logic; this is all done in the view's corresponding mediator.
 * </p>
 */
Ext.define("CafeTownsend.view.touch.LoginView", {
    extend: "Ext.form.Panel",
    alias: "widget.loginView",
    controller: "CafeTownsend.mediator.touch.LoginMediator",

    requires: [
        "Ext.form.FieldSet",
        "Ext.form.Password",
        "Ext.Label",
        "Ext.Img",
        "Ext.util.DelayedTask"
    ],

    config: {
        title: "Login",
        plugins: [
            {
                type: "localization",
                method: "setTitle",
                key: "login.title"
            }
        ],

        items: [
//            {
//                xtype: "image",
//                src: Ext.Viewport.getOrientation() == "portrait" ? "../../../img/login.png" : "../../../img/login-small.png",
//                style: Ext.Viewport.getOrientation() == "portrait" ? "width:80px;height:80px;margin:auto" : "width:40px;height:40px;margin:auto"
//            },
            {
                xtype: "fieldset",
                title: "Cafe Townsend",
                items: [
                    {
                        xtype: "textfield",
                        itemId: "usernameTextField",
                        name: "usernameTextField",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "login.username"
                            }
                        ]
                    },
                    {
                        xtype: "passwordfield",
                        itemId: "passwordTextField",
                        name: "passwordTextField",
                        required: true,
                        plugins: [
                            {
                                type: "localization",
                                method: "setPlaceHolder",
                                key: "login.password"
                            }
                        ]
                    }
                ]
            },
            {
                xtype: "label",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.passwordHint"
                    }
                ]
            },
            {
                xtype: "button",
                itemId: "logInButton",
                ui: "action",
                padding: "10px",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.submit"
                    }
                ]
            },
            {
                xtype: "label",
                itemId: "signInFailedLabel",
                name: "signInFailedLabel",
                hidden: true,
                hideAnimation: "fadeOut",
                showAnimation: "fadeIn",
                style: "color:#990000;margin:5px 0px;",
                plugins: [
                    {
                        type: "localization",
                        method: "setText",
                        key: "login.loginFailed"
                    }
                ]
            }
        ]
    }
});


