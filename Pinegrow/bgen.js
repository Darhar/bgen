$(function() {
    //Wait for Pinegrow to wake-up
    $("body").one("pinegrow-ready", function(e, pinegrow) {
        var f = new PgFramework("BGenPluginPlugin", "BGen");

        r = new PgComponentTypeResource(f.getResourceFile('../Theme/assets/js/jquery.min.js'));
        r.relative_url = 'js/jquery.min.js';
        r.source = crsaMakeFileFromUrl(r.url);
        r.footer = true;
        f.resources.add(r);

        //Create new Pinegrow framework object
        var r = new PgComponentTypeResource(f.getResourceFile('../Theme/assets/js/Bgen.js')); //relative to plugin js file
        r.relative_url = 'js/Bgen.js'; //what should the relative url be when resource is used on the page
        r.source = crsaMakeFileFromUrl(r.url);
        r.footer = true; //Recommended for JS files.
        f.resources.add(r);

        r = new PgComponentTypeResource(f.getResourceFile('../Theme/assets/js/custom.js'));
        r.relative_url = 'js/custom.js';
        r.source = crsaMakeFileFromUrl(r.url);
        r.footer = true;
        f.resources.add(r);


        var bgen = new PgComponentType('BGen.bgen', 'Background Generator');
        bgen.code = '<canvas \
          height="630" \
          width="630" \
          class="bgen" \
          data-bgen-value="250" \
          data-bgen-huedelta=".9" \
          data-bgen-locseed="3" \
          data-bgen-compopr="lighten" \
          data-bgen-gradientopr="Linear" \
          data-bgen-shapetype="Bar-horizontal" \
          data-bgen-fadedirection="Top" \
          data-bgen-lumdelta=".9" \
          data-bgen-satdelta=".9" \
          data-bgen-opacfactor=".9" \
          data-bgen-radiusmax="650" \
          data-bgen-radiusmin="100" \
          data-bgen-lifemax="150" \
          data-bgen-lifemin="1" \
          data-bgen-emitterxmin="0" \
          data-bgen-emitterymin="0" \
          data-bgen-emitterxmax="600" \
          data-bgen-emitterymax="500" \
          data-bgen-emitter="Area" \
          data-bgen-color="#e53030" \
          data-bgen-color-off="#ffed00"></canvas>';

        bgen.selector = 'canvas.bgen';
        bgen.preview_image = 'bgen.jpg';
        bgen.drag_helper = '<div class="pg-empty-placeholder">bgen</div>';
        bgen.tags = 'major';
        bgen.on_inserted = function($el) {
            bgen.BgenAdded($el);
            bgen.showBgen($el);
        },
                bgen.on_changed = function($el) {
                    bgen.showBgen($el);
                },
                bgen.sections = {
                    'BGen.bgen': {
                        name: 'bgen options',
                        fields: {
                            'BGen.bgen.value': {
                                type: 'text',
                                name: 'Particles',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-value');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-value', value);
                                    return value;
                                }
                            },
                            'BGen.bgen.locseed': {
                                type: 'text',
                                name: 'Random seed',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-locseed');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-locseed', value);
                                    return value;
                                }
                            },
                            'BGen.bgen.color': {
                                type: 'color',
                                name: 'Color 1',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-color');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-color', value);
                                    return value;
                                }
                            },
                            'BGen.bgen.color.off': {
                                type: 'color',
                                name: 'Color 2',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-color-off');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-color-off', value);
                                    bgen.showBgen($el);
                                    return value;
                                }
                            },
                            'BGen.bgen.compopr': {
                                type: 'select',
                                name: 'Blend',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-compopr');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-compopr', value);
                                    bgen.showBgen($el);
                                    return value;
                                },
                                attribute: 'data-placement',
                                'show_empty': true,
                                'options': [
                                    {'key': 'source-over', 'name': 'source-over'},
                                    {'key': 'source-atop', 'name': 'source-atop'},
                                    {'key': 'source-in', 'name': 'source-in'},
                                    {'key': 'source-out', 'name': 'source-out'},
                                    {'key': 'destination-over', 'name': 'destination-over'},
                                    {'key': 'destination-atop', 'name': 'destination-atop'},
                                    {'key': 'destination-in', 'name': 'destination-in'},
                                    {'key': 'destination-out', 'name': 'destination-out'},
                                    {'key': 'lighter', 'name': 'lighter'},
                                    {'key': 'copy', 'name': 'copy'},
                                    {'key': 'xor', 'name': 'xor'},
                                    {'key': 'multiply', 'name': 'multiply'},
                                    {'key': 'screen', 'name': 'screen'},
                                    {'key': 'overlay', 'name': 'overlay'},
                                    {'key': 'darken', 'name': 'darken'},
                                    {'key': 'lighten', 'name': 'lighten'},
                                    {'key': 'color-dodge', 'name': 'color-dodge'},
                                    {'key': 'color-burn', 'name': 'color-burn'},
                                    {'key': 'hard-light', 'name': 'hard-light'},
                                    {'key': 'soft-light', 'name': 'soft'},
                                    {'key': 'difference', 'name': 'difference'},
                                    {'key': 'exclusion', 'name': 'exclusion'},
                                    {'key': 'hue', 'name': 'hue'},
                                    {'key': 'saturation', 'name': 'saturation'},
                                    {'key': 'color', 'name': 'color'},
                                    {'key': 'luminosity', 'name': 'luminosity'}
                                ]
                            },
                            'BGen.bgen.bgcolor': {
                                type: 'color',
                                name: 'Background Color',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-backcolour');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-backcolour', value);
                                    return value;
                                }
                            },
                            'BGen.bgen.gradientopr': {
                                type: 'select',
                                name: 'Gradient',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-gradientopr');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-gradientopr', value);
                                    bgen.showBgen($el);
                                    return value;
                                },
                                attribute:
                                        'data-placement',
                                'show_empty': true,
                                'options': [
                                    {'key': 'None', 'name': 'None'},
                                    {'key': 'Radial', 'name': 'Radial'},
                                    {'key': 'Linear', 'name': 'Linear'}
                                ]
                            },
                            'BGen.bgen.shapetype': {
                                type: 'select',
                                name: 'Shape',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-shapetype');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-shapetype', value);
                                    bgen.showBgen($el);
                                    return value;
                                },
                                attribute:
                                        'data-placement',
                                'show_empty': true,
                                'options': [
                                    {'key': 'Circle', 'name': 'Circle'},
                                    {'key': 'Bar-horizontal', 'name': 'Bar-horizontal'},
                                    {'key': 'Bar-vertical', 'name': 'Bar-vertical'}
                                ]
                            },
                            'BGen.bgen.fadedirection': {
                                type: 'select',
                                name: 'Fade',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-fadedirection');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-fadedirection', value);
                                    bgen.showBgen($el);
                                    return value;
                                },
                                attribute:
                                        'data-placement',
                                'show_empty': true,
                                'options': [
                                    {'key': 'Top', 'name': 'Top'},
                                    {'key': 'Bottom', 'name': 'Bottom'},
                                    {'key': 'Left', 'name': 'Left'},
                                    {'key': 'Right', 'name': 'Right'}
                                ]
                            },
                            //hueDelta
                            'BGen.bgen.huedelta': {
                                type: 'text',
                                name: 'Hue Delta',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-huedelta');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    console.log('data-bgen-huedelta : ' + value);
                                    pgel.attr('data-bgen-huedelta', value);
                                    return value;
                                }
                            },
                            //satDelta
                            'BGen.bgen.satdelta': {
                                type: 'text',
                                name: 'Saturation Delta',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-satdelta');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-satdelta', value);
                                    return value;
                                }
                            },
                            //lumDelta
                            'BGen.bgen.lumdelta': {
                                type: 'text',
                                name: 'luminosity Delta',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-lumdelta');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-lumdelta', value);
                                    return value;
                                }
                            },
                            //opacFactor
                            'BGen.bgen.opacfactor': {
                                type: 'text',
                                name: 'Opacity',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-opacfactor');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-opacfactor', value);
                                    return value;
                                }
                            },
                            //radiusMax
                            'BGen.bgen.radiusmax': {
                                type: 'text',
                                name: 'Radius Max',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-radiusmax');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-radiusmax', value);
                                    return value;
                                }
                            },
                            //radiusMin
                            'BGen.bgen.radiusmin': {
                                type: 'text',
                                name: 'Radius Min',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-radiusmin');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-radiusmin', value);
                                    return value;
                                }
                            },
                            //lifeMax
                            'BGen.bgen.lifemax': {
                                type: 'text',
                                name: 'Life Max',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-lifemax');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-lifemax', value);
                                    return value;
                                }
                            },
                            //lifeMin
                            'BGen.bgen.lifemin': {
                                type: 'text',
                                name: 'Life Min',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-lifemin');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-lifemin', value);
                                    return value;
                                }
                            },
                            //emitterXMin
                            'BGen.bgen.emitterxmin': {
                                type: 'text',
                                name: 'Emitter X Min',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-emitterxmin');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-emitterxmin', value);
                                    return value;
                                }
                            },
                            //emitterXMax
                            'BGen.bgen.emitterxmax': {
                                type: 'text',
                                name: 'Emitter X Max',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-emitterxmax');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-emitterxmax', value);
                                    return value;
                                }
                            },
                            //emitterYMin
                            'BGen.bgen.emitterymin': {
                                type: 'text',
                                name: 'Emitter Y Min',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-emitterymin');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-emitterymin', value);
                                    return value;
                                }
                            },
                            //emitterYMax
                            'BGen.bgen.emitterymax': {
                                type: 'text',
                                name: 'Emitter Y Max',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-emitterymax');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-emitterymax', value);
                                    return value;
                                }
                            },
                            'BGen.bgen.emitter': {
                                type: 'select',
                                name: 'Emitter',
                                live_update: true,
                                action: 'custom',
                                get_value: function(obj) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    return pgel.attr('data-bgen-emitter');
                                },
                                set_value: function(obj, value, values, oldValue, eventType) {
                                    var $el = obj.data;
                                    var pgel = new pgQuery($el);
                                    pgel.attr('data-bgen-emitter', value);
                                    bgen.showBgen($el);
                                    return value;
                                },
                                attribute:
                                'data-placement',
                                'show_empty': true,
                                'options': [
                                    {'key': 'Circular', 'name': 'Circular'},
                                    {'key': 'Area', 'name': 'Area'}
                                ]
                            }

                            /*

                             imageWidth: imageWidth,
                             imageHeight: imageHeight,

                             */




                        }
                    }
                }
        //Custom functions
        bgen.showBgen = function($el) {
            var id = $el.attr('data-pg-id');
            var code = '$(\'[data-pg-id="' + id + '"]\').trigger(\'bgen-update\');';
            var page = pinegrow.getPageForElement($el);
            pinegrow.setIgnoreClicks(true);
            pinegrow.executeScriptInPage(page, code);
            pinegrow.setIgnoreClicks(false);
        }

        bgen.BgenAdded = function($el) {
            var code = '$(window).trigger(\'bgen-added\');';
            var page = pinegrow.getPageForElement($el);
            pinegrow.setIgnoreClicks(true);
            pinegrow.executeScriptInPage(page, code);
            pinegrow.setIgnoreClicks(false);
        }

        f.addComponentType(bgen);
        pinegrow.addFramework(f);
        var libsection = new PgFrameworkLibSection("BGenPluginPlugin_lib", "Components");
        libsection.setComponentTypes([bgen]);

        f.addLibSection(libsection);
    });
});
