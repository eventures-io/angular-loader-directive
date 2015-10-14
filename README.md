#CSS animated Angular loader directive

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
angular.module('myApp', ['eventures.loader']);
```

+ Add the loader directive to your template

``` html
  <loader animation"myAnimation"></loader>
```

+ Override LoaderProvider's default interceptable url ('/api') and abeyance (200ms) as needed.
``` js
         myApp.run(function(loaderProvider) {
                    loaderProvider.setInterceptableURL('my_backend_url');
                    loaderProvider.setAbeyance(delay_before_animation_starts);
         })
```

###Available animations:
+ box
+ bounce
+ cube
+ spinner
+ fold


### [Demo](http://eventures-io.github.io/angular-loader-directive)


CSS animations are thanks to:

* [tobiasahlin] (http://tobiasahlin.com/spinkit/)
