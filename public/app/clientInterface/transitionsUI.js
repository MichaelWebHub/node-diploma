angular.module('app')
    .factory('uiService', function () {

        return {

            hideRegistration: function () {
                return new Promise((resolve, reject) => {
                    const whitePlane = document.querySelector('.registration-inner');
                    const registration = document.querySelector('.registration');
                    const form = document.querySelector('.registration-form');

                    form.classList.add('ng-hide');
                    whitePlane.style.transform = "scale(7)";
                    whitePlane.style.background = "#ECEFF1";

                    setTimeout(function () {
                        registration.classList.add('ng-hide');
                        resolve();
                    }, 1300);
                });

            },

            showAdminPanel: function () {
                const admin = document.querySelector('.admin-panel');
                const orders = document.querySelector('.orders-panel');

                admin.classList.add('enter');
                orders.classList.add('enter');
            }
        }

    });