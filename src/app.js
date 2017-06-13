'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import MoviesService from './services/movies/movies';
import UserService from './services/user/user';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewHome from './components/view-home/view-home';
import ViewMovies from './components/view-movies/view-movies';
import ViewMovie from './components/view-movie/view-movie';
import ViewMovieEdit from './components/view-movie-edit/view-movie-edit';
import ViewMovieCreate from './components/view-movie-create/view-movie-create';
import ViewLogin from './components/view-login/view-login';
import ViewSignup from './components/view-signup/view-signup';
import ViewShop from './components/view-shop/view-shop';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    UserService.name,
    MoviesService.name,
    AppContent.name,
    ViewMovies.name,
    ViewMovie.name,
    ViewMovieEdit.name,
    ViewMovieCreate.name,
    ViewLogin.name,
    ViewSignup.name,
    ViewShop.name,
    ViewHome.name
]);

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

requireAll(require.context('./assets/img', true, /\.jpg|png$/));
function requireAll(r) {
  r.keys().forEach(r);
}


export default app;
