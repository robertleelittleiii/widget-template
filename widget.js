/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

/* Some utilites */

function ConvertMMToInches(mm) {
    return mm * 0.0393701;
};

function ConvertInchesToMM(inches) {
    return inches * 25.4;
};


requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

cprequire_test(["inline:com-chilipeppr-widget-cncutilities"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    // Please note that if you are working on multiple widgets at the same time
    // you may need to use the ?forcerefresh=true technique in the URL of
    // your test widget to force the underlying chilipeppr.load() statements
    // to referesh the cache. For example, if you are working on an Add-On
    // widget to the Eagle BRD widget, but also working on the Eagle BRD widget
    // at the same time you will have to make ample use of this technique to
    // get changes to load correctly. If you keep wondering why you're not seeing
    // your changes, try ?forcerefresh=true as a get parameter in your URL.

    console.log("test running of " + myWidget.id);

    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');

    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );

    // init my widget
    myWidget.init();
    $('#' + myWidget.id).css('margin', '20px');
    $('title').html(myWidget.name);

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-chilipeppr-widget-cncutilities", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-chilipeppr-widget-cncutilities", // Make the id the same as the cpdefine id
        name: "Widget / Template", // The descriptive name of your widget.
        desc: "This example widget gives you a framework for creating your own widget. Please change this description once you fork this template and create your own widget. Make sure to run runme.js every time you are done editing your code so you can regenerate your README.md file, regenerate your auto-generated-widget.html, and automatically push your changes to Github.", // A description of what your widget does
        url: "(auto fill by runme.js)", // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)", // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            '/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function() {
            console.log("I am being initted. Thanks.");

            this.setupUiFromLocalStorage();
            this.btnSetup();
            this.forkSetup();
            this.fieldSetup();

            console.log("I am done being initted.");
        },
        activate: function() {
            console.log("activate");
            this.setupUiFromLocalStorage();

        },
        unactivate: function() {
            console.log("unactivate");
            this.saveOptionsLocalStorage();

        },

        setUnitTags: function() {
            if ($($('#' + this.id + ' select#waste-board-units')).val() == "mm") {
                $('#' + this.id + ' .unit').text("mm");
            }
            else {
                $('#' + this.id + ' .unit').text("inch");
            }
        },

        /**
         * Call this method from init to setup all the buttons when this widget
         * is first loaded. This basically attaches click events to your 
         * buttons. It also turns on all the bootstrap popovers by scanning
         * the entire DOM of the widget.
         */
        btnSetup: function() {

            // Chevron hide/show body
            var that = this;
            $('#' + this.id + ' .hidebody').click(function(evt) {
                console.log("hide/unhide body");
                if ($('#' + that.id + ' .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                }
                else {
                    // hide
                    that.hideBody(evt);
                }
            });

            // Ask bootstrap to scan all the buttons in the widget to turn
            // on popover menus
            $('#' + this.id + ' .btn').popover({
                delay: 1000,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

            // Init Say Hello Button on Main Toolbar
            // We are inlining an anonymous method as the callback here
            // as opposed to a full callback method in the Hello Word 2
            // example further below. Notice we have to use "that" so 
            // that the this is set correctly inside the anonymous method

            // $('#' + this.id + ' .btn-sayhello').click(function() {
            //     console.log("saying hello");
            //     // Make sure popover is immediately hidden
            //     $('#' + that.id + ' .btn-sayhello').popover("hide");
            //     // Show a flash msg
            //     chilipeppr.publish(
            //         "/com-chilipeppr-elem-flashmsg/flashmsg",
            //         "Hello Title",
            //         "Hello World from widget " + that.id,
            //        1000
            //    );
            // });
            $('#' + this.id + ' .btn-sendGcodetoWorkspace').click(this.sendGcodeToWorkspace.bind(this));
            $('#' + this.id + ' .btn-sendGridGcodetoWorkspace').click(this.sendGridGcodeToWorkspace.bind(this));


            // Init Hello World 2 button on Tab 1. Notice the use
            // of the slick .bind(this) technique to correctly set "this"
            // when the callback is called
            // $('#' + this.id + ' .btn-helloworld2').click(this.onHelloBtnClick.bind(this));
            $('#' + this.id + ' .btn-generate-waste-prep-gcode').click(this.generateGcodeWasteboardPrep.bind(this));
            $('#' + this.id + ' .btn-generate-grid-gcode').click(this.generateGcodeGridPrep.bind(this));
        },
        fieldSetup: function() {
            var that = this;

            $('#' + this.id + ' select#waste-board-units').off('change').blur().on('change', function() {
                // alert($(this).val());
                if ($(this).val() == "mm") {
                    $('#' + that.id + ' .unit').text("mm");
                    $('#' + that.id + ' input').each(function() {
                        var newValue = ConvertInchesToMM(parseFloat($(this).val().replace(",", ".")));
                        if ($(this).attr("name") == "waste-board-feed-rate")
                            $(this).val(newValue.toFixed(0));
                        else
                            $(this).val(newValue.toFixed(3));

                    });

                }
                else {
                    $('#' + that.id + ' .unit').text("inch");

                    $('#' + that.id + ' input').each(function() {
                        var newValue = ConvertMMToInches(parseFloat($(this).val().replace(",", ".")));
                        $(this).val(newValue);

                    });

                }
                that.saveOptionsLocalStorage();
                console.log("test");
            });

            $('#' + this.id + ' input').change(function() {
                that.saveOptionsLocalStorage();
                console.log("test");
            });


        },
        /**
         * onHelloBtnClick is an example of a button click event callback
         */
        onHelloBtnClick: function(evt) {
            console.log("saying hello 2 from btn in tab 1");
            chilipeppr.publish(
                '/com-chilipeppr-elem-flashmsg/flashmsg',
                "Hello 2 Title",
                "Hello World 2 from Tab 1 from widget " + this.id,
                2000 /* show for 2 second */
            );
        },
        /**
         * User options are available in this property for reference by your
         * methods. If any change is made on these options, please call
         * saveOptionsLocalStorage()
         */
        options: null,
        /**
         * Call this method on init to setup the UI by reading the user's
         * stored settings from localStorage and then adjust the UI to reflect
         * what the user wants.
         */
        setupUiFromLocalStorage: function() {

            // Read vals from localStorage. Make sure to use a unique
            // key specific to this widget so as not to overwrite other
            // widgets' options. By using this.id as the prefix of the
            // key we're safe that this will be unique.

            // Feel free to add your own keys inside the options 
            // object for your own items

            var options = localStorage.getItem(this.id + '-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            }
            else {
                options = {
                    showBody: true,
                    tabShowing: 1,
                    customParam1: null,
                    customParam2: 1.0,
                    wasteBoardOptions: $("form#waste-prep").serializeArray(),
                    gridOptions: $("form#grid-prep").serializeArray()
                };
            }

            $(options.wasteBoardOptions).each(function() {
                $('input[name="' + this.name + '"]').val(this.value);
                $('select[name="' + this.name + '"]').val(this.value);
                console.log(this);
            });

            $(options.gridOptions).each(function() {
                $('input[name="' + this.name + '"]').val(this.value);
                $('select[name="' + this.name + '"]').val(this.value);
                console.log(this);
            });

            this.setUnitTags();

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            }
            else {
                this.hideBody();
            }

        },
        /**
         * When a user changes a value that is stored as an option setting, you
         * should call this method immediately so that on next load the value
         * is correctly set.
         */
        saveOptionsLocalStorage: function() {
            // You can add your own values to this.options to store them
            // along with some of the normal stuff like showBody
            // set options to current wasteboard form:

            this.options.wasteBoardOptions = $("form#waste-prep").serializeArray();
            this.options.gridOptions = $("form#grid-prep").serializeArray();

            var options = this.options;
            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store settings to localStorage
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        /**
         * Show the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        showBody: function(evt) {
            $('#' + this.id + ' .panel-body').removeClass('hidden');
            $('#' + this.id + ' .panel-footer').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
            // this will send an artificial event letting other widgets know to resize
            // themselves since this widget is now taking up more room since it's showing
            $(window).trigger("resize");
        },
        /**
         * Hide the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        hideBody: function(evt) {
            $('#' + this.id + ' .panel-body').addClass('hidden');
            $('#' + this.id + ' .panel-footer').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
            // this will send an artificial event letting other widgets know to resize
            // themselves since this widget is now taking up less room since it's hiding
            $(window).trigger("resize");
        },
        /**
         * This method loads the pubsubviewer widget which attaches to our 
         * upper right corner triangle menu and generates 3 menu items like
         * Pubsub Viewer, View Standalone, and Fork Widget. It also enables
         * the modal dialog that shows the documentation for this widget.
         * 
         * By using chilipeppr.load() we can ensure that the pubsubviewer widget
         * is only loaded and inlined once into the final ChiliPeppr workspace.
         * We are given back a reference to the instantiated singleton so its
         * not instantiated more than once. Then we call it's attachTo method
         * which creates the full pulldown menu for us and attaches the click
         * events.
         */
        forkSetup: function() {
            var topCssSelector = '#' + this.id;

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },
        boardPrepGcode: null,
        gridGcode:null,
        sendGcodeToWorkspace: function() {
            console.log("sendGcodeToWorkspace");
            var gcodetxt = this.boardPrepGcode;
            var info = {
                name: "Board Level Prep  " + gcodetxt.substring(0, 20),
                lastModified: new Date()
            };
            console.log("info:", info);
            // send event off as if the file was drag/dropped
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", this.boardPrepGcode, info);
        },
        sendGridGcodeToWorkspace: function() {
            console.log("sendGridGcodeToWorkspace");
            var gcodetxt = this.gridGcode;
            var info = {
                name: "Board Grid  " + gcodetxt.substring(0, 20),
                lastModified: new Date()
            };
            console.log("info:", info);
            // send event off as if the file was drag/dropped
            chilipeppr.publish("/com-chilipeppr-elem-dragdrop/ondropped", this.gridGcode, info);
        },
        generateGcodeGridPrep: function() {
            var gridSettings = this.options.gridOptions;

            var gridUnits = $.grep(gridSettings, function(e) {
                return e.name == 'grid-units';
            })[0].value
            var limitX = parseFloat($.grep(gridSettings, function(e) {
                return e.name == 'grid-width-x';
            })[0].value);
            var limitY = parseFloat($.grep(gridSettings, function(e) {
                return e.name == 'grid-width-y';
            })[0].value);
            var majorMark = $.grep(gridSettings, function(e) {
                return e.name == 'grid-major-mark';
            })[0].value
            var passDepth = parseFloat($.grep(gridSettings, function(e) {
                return e.name == 'grid-cut-depth';
            })[0].value) * -1;
            var plungeRate = parseFloat($.grep(gridSettings, function(e) {
                return e.name == 'grid-plunge-rate';
            })[0].value);
            var feedRate = parseFloat($.grep(gridSettings, function(e) {
                return e.name == 'grid-feed-rate';
            })[0].value);
            var about = "generate gcode to control cnc machine to<br>" +
                "; draw 1in grid lines on table with marker<br>";
            
            var letterWidth = 4;
            var letterHeight = 5;
            var gcode = ""

            gcode += cmt(about);
            gcode += msg("Create Grid on CNC Waste Board in mm");
            gcode += msg("Set up Coordinate System");
            gcode += cmd("G90 G94");
            gcode += cmd("G17");
            gcode += cmd("G21");
            gcode += cmd("G28 G91 Z0");
            gcode += cmd("G90");
            gcode += msg("Set up tool change pause");
            gcode += cmd("T1 M6", "Tool change to Tool 1")
            gcode += msg("Start Motor and begin cutting");
            gcode += cmd("S9000 M3", "Motor on at 9000 RPM");

            gcode += go(0, 0, feedRate); // home pos
            gcode += z(passDepth,plungeRate); // marker down

            var i = 0;
            gcode +=msg("draw horz X lines");
            while (1) {
                gcode += x(limitX,feedRate ); //all way right
                i = i + majorMark;
                if (i > limitY) break;
                gcode += y(i, feedRate); //up to next line
                gcode += x(0, feedRate); //all way left
                i = i + majorMark;
                if (i > limitY) break;
                gcode += y(i, feedRate); //up to next line
            }


            gcode += z(1, plungeRate); //marker up..
            gcode += go(0, 0, feedRate); //go home
            gcode += z(passDepth, plungeRate); //marker down

            var i = 0;
            gcode += msg("draw vertical Y lines");
            while (1) {
                gcode += y(limitY, feedRate); //all way up
                i = i + majorMark;
                if (i > limitX, feedRate) break;
                gcode += x(i, feedRate); //right one
                gcode += y(0, feedRate); //all way down
                i = i + majorMark;
                if (i > limitX) break;
                gcode += x(i, feedRate); //right one
            }

            gcode += z(5,plungeRate);

            var i = 0;
            while (1) {
                i = i + majorMark;
                textValue = i;
                // if (textValue >= 10 & textValue <=20) {
                gcode += drawNumber(textValue / majorMark, i, 1, 'c', 'b', plungeRate, feedRate, letterWidth, letterHeight);
                // }

                console.log("draw number: " + textValue + "Length: " + (textValue + "").length + " ivalue:" + i);
                if (i > (limitX - majorMark)) break;
            }


            var i = 0;
            while (1) {
                i = i + majorMark;
                textValue = i;
                // if (textValue >= 10 & textValue <=20) {
                gcode += drawNumber(textValue / majorMark, 1, i, 'l', 'm', plungeRate, feedRate, letterWidth, letterHeight);
                // }

                // console.log("draw number: " + textValue + "Length: "+( textValue + "").length + " ivalue:" + i);
                if (i > (limitY - majorMark)) break;
            }

            gcode += msg("draw rectangle around entire perimiter");
            gcode += drawRect(0, 0, limitX, limitY);

            gcode += msg("Turn Spindle Off");
            gcode += cmd("M5", "Spindle Off");


            gcode += msg("complete goto center");
            gcode += z(5, plungeRate)
            gcode += go(limitX / 2, limitY / 2, feedRate);

            gCode=gcode;
            //document.getElementById('text').innerHTML = gcode;



        },
        generateGcodeWasteboardPrep: function() {

            var wasteBoardSettings = this.options.wasteBoardOptions;

            var unitID = $.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-units';
            })[0].value
            var endMillDiameter = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-tool-diameter';
            })[0].value);
            var x = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-width-x';
            })[0].value);
            var y = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-width-y';
            })[0].value);
            var passDepth = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-cut-depth';
            })[0].value) * -1;
            var passDepthMax = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-max-cut-depth-pass';
            })[0].value);
            var feedRate = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-feed-rate';
            })[0].value);
            var stepOver = parseFloat($.grep(wasteBoardSettings, function(e) {
                return e.name == 'waste-board-step-over';
            })[0].value);

            // Convert inches to mm before generate GCode
            if (unitID == "inch") {
                endMillDiameter = ConvertInchesToMM(endMillDiameter).toFixed(3);
                x = ConvertInchesToMM(x).toFixed(3);
                y = ConvertInchesToMM(y).toFixed(3);
                passDepth = ConvertInchesToMM(passDepth);
                feedRate = ConvertInchesToMM(feedRate).toFixed(0);
            }

            stepOver = endMillDiameter * stepOver;
            var widthDistance = x - endMillDiameter;
            var heightDistance = y - stepOver;
            var feedRateStr = feedRate.toString().replace(",", ".");
            var widthDistanceStr = widthDistance.toString().replace(",", ".");

            // Generate GCode
            var goingRight = true;
            var gCode = "";
            gCode += "(Set up Coordinate System) \n";
            gCode += "G90 G94 \n";
            gCode += "G17 \n";
            gCode += "G21 ; Set units to mm\n";
            gCode += "G28 G91 Z0 \n";
            gCode += "G90 \n";
            gCode += "(Set up tool change pause)\n";
            gCode += "T1 M6; Tool change to Tool 1\n";
            gCode += "(Start Motor and begin cutting)\n";
            gCode += "S9000 M3; Motor on at 9000 RPM\n";
            gCode += "G21 ; Set units to mm\n";
            gCode += "G90 ; Absolute positioning\n";

            // Move Z Axis
            gCode += "G1 Z" + passDepth.toFixed(3).replace(",", ".") + " F" + feedRateStr + "\n";
            gCode += "G1 X0 Y0 F" + feedRateStr + "\n";

            var lastY = 0;
            for (d = 0; d < heightDistance; d += stepOver) {
                gCode += "G1 Y" + d.toFixed(3).replace(",", ".") + " F" + feedRateStr + "\n";
                lastY = d.toFixed(3);

                if (goingRight) {
                    gCode += "G1 X" + widthDistanceStr + " F" + feedRateStr + "\n";
                }
                else {
                    gCode += "G1 X0" + " F" + feedRateStr + "\n";
                }

                goingRight = !goingRight;
            }

            if (lastY < heightDistance) {
                gCode += "G1 Y" + heightDistance.toFixed(3).replace(",", ".") + " F" + feedRateStr + "\n";
                if (goingRight) {
                    gCode += "G1 X" + widthDistanceStr + " F" + feedRateStr + "\n";
                }
                else {
                    gCode += "G1 X0" + " F" + feedRateStr + "\n";
                }
            }

            gCode += "(Turn Spindle Off) \n";
            gCode += "M5; Spindle Off \n";
            gCode += "(complete goto Work Zero) \n";
            gCode += "G0 Z10 F60 \n";
            gCode += "G0 X0 Y0 F300 \n";

            this.boardPrepGcode = gCode;
            //return gCode;

        },

    }
});



//RunGCode, true returns when movement complete.

function go(x, y, cuteRate) {
    return "G0 X" + x + " Y" + y + " F" + cuteRate + "<br>";
}

function arc(x, y, i, j, cutRate) {
    return "G2 X" + x + " Y" + y + " I" + i + " J" + j + " F" + cutRate + "<br>";
}

function ccarc(x, y, i, j, cutRate) {
    return "G3 X" + x + " Y" + y + " I" + i + " J" + j + " F" + cutRate + "<br>";
}

function x(pos, cutRate) {
    return "G0 X" + pos + " F" + cutRate + "<br>";
}

function y(pos, cutRate) {
    return "G0 Y" + pos + " F" + cutRate + "<br>";
}

function z(pos, plungeRate) {
    return "G0 Z" + pos + " F" + plungeRate + "<br>";
}

function cmt(txt) {
    return "<br>; " + txt + "<br>";
}

function msg(txt) {
    return "(" + txt + ") <br>";
}

function cmd(txt, comment) {
    return txt + (typeof comment == "undefined" ? "" : "; " + comment) + "<br>";
}

function draw1(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 1");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 4 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(1 + x0, 5 + y0, cutRate);
    gcode += go(1 + x0, 0 + y0, cutRate);
    gcode += z(2, plungeRate);

    return (gcode);
    // G0 Z2
    // G0 X0 Y4
    // G1 Z-1
    // G1 X1 Y5
    // G1 X1 Y0

}

function draw2(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 2");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 4 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += arc(2 + x0, 3 + y0, 1, 0, cutRate);
    gcode += go(0 + x0, 0 + y0, cutRate);
    gcode += go(2 + x0, 0 + y0, cutRate);
    gcode += z(2, plungeRate);
    return gcode;
    // G0 Z2
    // G0 X7 Y4
    // G1 Z-1
    // G2 X9 Y3 I1 J0
    // G1 X7 Y0
    // G1 X9 Y0


}



function draw3(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 2");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 5 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(2 + x0, 5 + y0, cutRate);
    gcode += arc(3 + x0, 4 + y0, 0, -1, cutRate);
    gcode += go(3 + x0, 4 + y0, cutRate);
    gcode += arc(2 + x0, 3 + y0, -1, 0, cutRate);
    gcode += go(1 + x0, 3 + y0, cutRate);
    gcode += z(2, plungeRate);
    gcode += go(2 + x0, 3 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += arc(3 + x0, 2 + y0, 0, -1, cutRate);
    gcode += go(3 + x0, 1 + y0, cutRate);
    gcode += arc(2 + x0, 0 + y0, -1, 0), cutRate;
    gcode += go(0 + x0, 0 + y0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;
    // G0 Z2
    // G0 X14 Y5
    // G1 Z-1
    // G1 X16 Y5
    // G2 X17 Y4 I0 J-1
    // G1 X17 Y4
    // G2 X16 Y3 I-1 J0
    // G1 X15 Y3
    // G0 Z2
    // G0 X16 Y3
    // G1 Z-1
    // G2 X17 Y2 I0 J-1
    // G1 X17 Y1
    // G2 X16 Y0 I-1 J0
    // G1 X14 Y0


}

function draw4(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 4");
    gcode += z(2, plungeRate);
    gcode += go(1 + x0, 5 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(0 + x0, 1 + y0, cutRate);
    gcode += go(2 + x0, 1 + y0, cutRate);
    gcode += z(2, plungeRate);
    gcode += go(2 + x0, 0 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(2 + x0, 2 + y0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;

    // G0 Z2
    // G0 X23 Y5
    // G1 Z-1
    // G1 X22 Y1
    // G1 X24 Y1
    // G0 Z2
    // G0 X24 Y0
    // G1 Z-1
    // G1 X24 Y2


}

function draw5(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 5");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 0 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(1 + x0, 0 + y0, cutRate);
    gcode += ccarc(2 + x0, 1 + y0, 0, 1, cutRate);
    gcode += go(2 + x0, 2 + y0, cutRate);
    gcode += ccarc(1 + x0, 3 + y0, -1, 0, cutRate);
    gcode += go(0 + x0, 3 + y0, cutRate);
    gcode += go(0 + x0, 5 + y0, cutRate);
    gcode += go(2 + x0, 5 + y0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;
    // G0 Z2
    // G0 X30 Y0          0,0
    // G1 Z-1
    // G1 X31 Y0          1,0
    // G3 X32 Y1 I0 J1    2,1
    // G1 X32 Y2          2,2
    // G3 X31 Y3 I-1 J0   1,3
    // G1 X30 Y3				  0,3
    // G1 X30 Y5          0,5
    // G1 X32 Y5          2,5


}

function draw6(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 6");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 2 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += arc(2 + x0, 2 + y0, 1, 0, cutRate);
    gcode += go(2 + x0, 1 + y0, cutRate);
    gcode += arc(0 + x0, 1 + y0, -1, 0, cutRate);
    gcode += go(0 + x0, 2 + y0, cutRate);
    gcode += arc(1 + x0, 5 + y0, 4, 0), cutRate;
    gcode += z(2, plungeRate);

    return gcode;
    // G0 Z2
    // G0 X38 Y2         0,2
    // G1 Z-1
    // G2 X40 Y2 I1 J0   2,2
    // G1 X40 Y1         2,1
    // G2 X38 Y1 I-1 J0  0,1
    // G1 X38 Y2         0,2
    // G2 X39 Y5 I4 J0   1,5


}


function draw7(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 7");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 5 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(2 + x0, 5 + y0, cutRate);
    gcode += go(0 + x0, 0 + y0, cutRate);
    gcode += z(2, plungeRate);
    gcode += go(1 + x0, 3 + y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += go(2 + x0, 3 + y0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;
    // G0 Z2
    // G0 X46 Y5       0,5
    // G1 Z-1
    // G1 X48 Y5        2,5
    // G1 X46 Y0        0,0
    // G0 Z2
    // G0 X47 Y3        1,3
    // G1 Z-1         
    // G1 X48 Y3       2,3


}

function draw8(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 8");
    gcode += z(2, plungeRate);
    gcode += go(1 + x0, 3 + y0);
    gcode += z(zDepth, plungeRate);
    gcode += ccarc(1 + x0, 5 + y0, 0, 1, cutRate);
    gcode += ccarc(1 + x0, 3 + y0, 0, -1, cutRate);
    gcode += arc(2 + x0, 2 + y0, 0, -1, cutRate);
    gcode += go(2 + x0, 1 + y0, cutRate);
    gcode += arc(0 + x0, 1 + y0, -1, 0, cutRate);
    gcode += go(0 + x0, 2 + y0, cutRate);
    gcode += arc(1 + x0, 3 + y0, 1, 0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;

    // updated gcode
    // G0 Z2
    // G0 X54 Y3          1,3
    // G1 Z-1
    // G3 X54 Y5 I0 J1    1,5
    // G3 X54 Y3 I0 J-1   1,3
    // G2 X55 Y2 I0 J-1   2,2
    // G1 X55 Y1					2,1
    // G2 X53 Y1 I-1 J0   0,1
    // G1 X53 Y2          0,2
    // G2 X54 Y3 I1 J0    1,3

    // G0 Z2
    // G0 X54 Y3     1,3
    // G1 Z-1
    // G3 X54 Y5 I0 J1  ccw   1,5
    // G3 X54 Y3 I0 J-1 ccw   1,3
    // G2 X56 Y2 I0 J-1 cw    3,2
    // G1 X56 Y1              3,1
    // G2 X53 Y1 I-1 J0 cw    0,1
    // G1 X53 Y2							0,2
    // G2 X54 Y3 I1 J0 cw     1,3


}

function draw9(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 9");
    gcode += z(2, plungeRate);
    gcode += go(1 + x0, 0 + y0);
    gcode += z(zDepth, plungeRate);
    gcode += ccarc(2 + x0, 3 + y0, -2, 3, cutRate);
    gcode += go(2 + x0, 4 + y0, cutRate);
    gcode += ccarc(0 + x0, 4 + y0, -1, 0, cutRate);
    gcode += go(0 + x0, 3 + y0, cutRate);
    gcode += ccarc(2 + x0, 3 + y0, 1, 0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;
    // G0 Z2
    // G0 X62 Y0         1,0
    // G1 Z-1
    // G3 X63 Y3 I-2 J3  2,3,-2,3
    // G1 X63 Y4         2,4
    // G3 X61 Y4 I-1 J0  0,4,-1,0
    // G1 X61 Y3         0,3
    // G3 X63 Y3 I1 J0   2,3,1,0
}

function draw0(x0, y0, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += msg("Draw 0");
    gcode += z(2, plungeRate);
    gcode += go(0 + x0, 4 + y0);
    gcode += z(zDepth, plungeRate);
    gcode += arc(2 + x0, 4 + y0, 1, 0, cutRate);
    gcode += go(2 + x0, 1 + y0, cutRate);
    gcode += arc(0 + x0, 1 + y0, -1, 0, cutRate);
    gcode += go(0 + x0, 4 + y0, cutRate);
    gcode += z(2, plungeRate);

    return gcode;

    // G0 Z2
    // G0 X69 Y4            0,4
    // G1 Z-1
    // G2 X71 Y4 I1 J0      2,4,1,0
    // G1 X71 Y1            2,1   
    // G2 X69 Y1 I-1 J0     0,1,-1,0
    // G1 X69 Y4            0,4
}


function drawNumber(number, x0, y0, align, hAlign, plungeRate, cutRate, letterWidth, letterHeight) {
    var textNumber = number + "";
    var drawOffset = 0;
    var align = typeof align == "undefined" ? "l" : align
    var hAlign = typeof hAlign == "undefined" ? "b" : hAlign
    var gcode = "";
    var hAlignOffset;
    var alignOffset;

    console.log(textNumber);

    if (hAlign == "b") {
        hAlignOffset = 0;
    }
    else if (hAlign == "t") {
        hAlignOffset = -letterHeight;
    }
    else if (hAlign == "m") {
        hAlignOffset = -1 * letterHeight / 2;
    }

    if (align == "l") {
        alignOffset = 0;
    }
    else if (align == "r") {
        alignOffset = -textNumber.length * letterWidth;
    }
    else if (align == "c") {
        alignOffset = -((textNumber.length * letterWidth) - 1) / 2;
    }
    console.log(number);

    for (var i = 0; i < textNumber.length; i++) {
        console.log(i);

        switch (Number(textNumber[i])) {
            case 1:
                gcode += draw1(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 2:
                gcode += draw2(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 3:
                gcode += draw3(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 4:
                gcode += draw4(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 5:
                gcode += draw5(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 6:
                gcode += draw6(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 7:
                gcode += draw7(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 8:
                gcode += draw8(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 9:
                gcode += draw9(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            case 0:
                gcode += draw0(x0 + drawOffset + alignOffset, y0 + hAlignOffset, plungeRate, cutRate);
                drawOffset = drawOffset + letterWidth;
                break;
            default:

        }
    }
        return gcode;
}

function drawRect(x0, y0, w, h, zDepth, plungeRate, cutRate) {
    var gcode = "";
    gcode += z(1, plungeRate);
    gcode += go(x0, y0, cutRate);
    gcode += z(zDepth, plungeRate);
    gcode += x(x0 + w, cutRate);
    gcode += y(y0 + h, cutRate);
    gcode += x(x0), cutRate;
    gcode += y(y0, cutRate);
    gcode += z(1, plungeRate);
}