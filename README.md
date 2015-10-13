#CSS animated pre-loader Angular directive

## Install

+ Bower

```bash
$ bower install angular-loader-directive --save
```

### Include the javascript file:

+ Use Wiredep

+ Or include it manually:

``` html
<script src="bower_components/angular-loader-directive/dist/angular-loader.min.js"></script>
```

### Include the CSS

* SASS :

``` css
    @import "../bower_components/angular-loader-directive/src/scss/loader";

    (and comment out the imports for the animations you will not use)
```

* HTML

``` html
    <link href="bower_components/angular-loader-directive/dist/styles/loader.css" rel="stylesheet">
```

##Use

+ Inject the loader module into your app:

``` js
angular.module('myApp', ['evtrs.loader']);
```

+ Create a 'LoaderConfig' constant that contains an API_ENDPOINT property with your backend url

``` js
myApp.constant('LoaderConfig', {API_ENDPOINT: 'htt://my.backend/api'});
```

+ Push the HTTP interceptor in your app's config

``` js
myApp.config(function($httpProvider){
    $httpProvider.interceptors.push('HttpRequestInterceptor');
}
```

+ Add the loader directive to your template

``` html
  <loader animation"myAnimation"></loader>
```

###Available animations:
+ box
+ bounce


### [Demo](http://eventures-io.github.io/angular-loader-directive)


CSS animations are thanks to:

* [tobiasahlin] (http://tobiasahlin.com/spinkit/)
