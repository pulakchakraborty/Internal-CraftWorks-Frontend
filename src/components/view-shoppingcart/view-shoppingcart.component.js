/**
 * Created by barbaraprommegger on 26/06/2017.
 */

'use strict';

import template from './view-shoppingcart.template.html';
import UserService from './../../services/user/user.service';
import ProductsService from './../../services/products/products.service';
import './view-shoppingcart.style.css';


class ViewShoppingCartComponent {
    constructor(){
        this.controller = ViewShoppingCartComponentController;
        this.template = template;
        this.bindings = {
            products: '<',
        }
    }

    static get name() {
        return 'viewShoppingCart';
    }


}

class ViewShoppingCartComponentController{
    constructor($state,UserService,ProductsService){
        this.$state = $state;
        this.UserService = UserService;
        this.ProductsService = ProductsService;
        this.shoppingCart = [];

    }

    details (product) {
        let _id = product['_id'];
        this.$state.go('product',{ productId:_id});
    };


    static get $inject(){
        return ['$state', UserService.name, ProductsService.name];
    };

    subtotal(products) {
        var total = 0;
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
                total += parseInt(product.price);
        }
        this.delivery(total);
        return total;

    };

    delivery(total) {
        var deliverycost = 0;
        if (total > 100) {
            deliverycost = 10;
        } else {
            deliverycost = 0;
        }
        return deliverycost;
    };

    cancel() {
        this.$state.go('app.offers',{});
    };

    checkout() {
        if (this.UserService.isAuthenticated()) {
            this.$state.go('app.checkout',);
        } else {
            this.$state.go('app.login',{});
        }
    };






}

export default ViewShoppingCartComponent;