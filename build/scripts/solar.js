/**
 * @author Thodoris Tsiridis
 */
var STL = STL || {};
/**
 * Simulates a display object just like in AS3
 *
 * @module 72lions
 * @class CanvasDisplayObject
 * @author Thodoris Tsiridis
 * @version 1.0
 */
STL.CanvasDisplayObject = function() {

    var _children = [];

    this.name = '';
    this.x = 0;
    this.y  = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.visible = true;
    this.alpha = 1;
    this.extra = {};

    /**
     * It is set to true the first time we get a popstate
     *
     * @private
     * @type ST.CanvasDisplayObject
     * @default null
     */
    this.parent = null;

    /**
     * Adds a child to the display object
     *
     * @param {CanvasDisplayObject} child The display object to add as a child
     * @author Thodoris Tsiridis
     */
    this.addChild = function(child) {

        //Check if the child doesn't already exist
        if (_children.indexOf(child) === - 1) {

            //Check if the child already has a parent
            if( child.parent !== null ) {

                //If it already has a parent then remove it from it's parent
                child.parent.removeChild( child );

            }

            //Set the parent of the child
            child.parent = this;

            //Push the child in the array
            _children.push( child );

        }

    };
    /**
     * Removes a child
     *
     * @param {CanvasDisplayObject} child  The display object to remove
     * @author Thodoris Tsiridis
     */
    this.removeChild = function(child) {

        var childIndex = _children.indexOf( child );

        //Check the child index
        if (  childIndex !== - 1 ) {

            child.parent = null;

            //Remove the child from the children array
            _children.splice( childIndex, 1 );

        }
    };
    /**
     * Returns an array with all the children
     *
     * @returns {Array} The array with all the children
     * @author Thodoris Tsiridis
     */
    this.getChildren = function() {
        return _children;
    };
    /**
     * Updates the object
     *
     * @param {CanvasContext} ctx The context on which everything will be drawn
     * @author Thodoris Tsiridis
     */
    this.update = function(ctx) {

        if(this.visible !== false) {

            //Save the current translation, rotation
            ctx.save();

            //Translate Scale and Rotate
            ctx.translate(this.x, this.y);
            ctx.scale(this.scaleX,this.scaleY);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = ctx.globalAlpha * this.alpha;

            this.draw();

            //Invoke the update function for each child
            var d = 0;

            while(d < _children.length) {

                _children[d].update(ctx);

                d++;
            }

            //Restore the translation, rotation
            ctx.restore();

            d = null;

        }
    };
};

/**
 * Generic function for overwritting and adding the your code
 */
STL.CanvasDisplayObject.prototype.draw = function(){};

  
(function() {
  
var canvas;
var context;

var totalRings = 9;
var rings = [];

var stage, sun, sunGrad;
var planets = [];
  
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 700;

var t = 0;

var data = [{
  name: 'Mercury',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 60,
  speed: 0.8,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 4,
  planetColor: '#999999',
  isSatelite: false,
  satelites: []
}, {
  name: 'Venus',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 90,
  speed: 0.3,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 6,
  planetColor: '#bf8639',
  isSatelite: false,
  satelites: []
}, {
  name: 'Earth',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 120,
  speed: 0.2,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 6,
  planetColor: '#0066cc',
  isSatelite: false,
  satelites: [
    {
      name: 'Moon',
      x: CANVAS_WIDTH * 0.5,
      y: CANVAS_HEIGHT * 0.5,
      radius: 13,
      speed: 3,
      degree: Math.random() * 1000,
      radian: 0,
      planetSize: 2,
      planetColor: '#cccccc',
      isSatelite: true,
      satelites: []
    }
  ]
}, {
  name: 'Mars',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 150,
  speed: 0.1,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 6,
  planetColor: '#aa4200',
  isSatelite: false,
  satelites: []
}, {
  name: 'Jupiter',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 180,
  speed: 0.06,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 7,
  planetColor: '#e0ae6f',
  isSatelite: false,
  satelites: []
}, {
  name: 'Saturn',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 210,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 7,
  planetColor: '#f0e38b',
  isSatelite: false,
  satelites: [
    {
      name: 'Titan',
      x: CANVAS_WIDTH * 0.5,
      y: CANVAS_HEIGHT * 0.5,
      radius: 13,
      speed: 1,
      degree: Math.random() * 1000,
      radian: 0,
      planetSize: 1,
      planetColor: '#ffffff',
      isSatelite: true,
      satelites: []
    }, {
      name: 'Phoebe',
      x: CANVAS_WIDTH * 0.5,
      y: CANVAS_HEIGHT * 0.5,
      radius: 15,
      speed: 1.3,
      degree: Math.random() * 1000,
      radian: 0,
      planetSize: 1,
      planetColor: '#ffffff',
      isSatelite: true,
      satelites: []
    }, {
      name: 'Pandora',
      x: CANVAS_WIDTH * 0.5,
      y: CANVAS_HEIGHT * 0.5,
      radius: 18,
      speed: 1,
      degree: Math.random() * 1000,
      radian: 0,
      planetSize: 1,
      planetColor: '#ffffff',
      isSatelite: true,
      satelites: []
    }]
}, {
  name: 'Uranus',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 240,
  speed: 0.05,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 7,
  planetColor: '#82b3d1',
  isSatelite: false,
  satelites: []
}, {
  name: 'Neptune',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 270,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 8,
  planetColor: '#82b3d1',
  isSatelite: false,
  satelites: []
}, {
  name: 'Pluto',
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 300,
  speed: 0.03,
  degree: Math.random() * 1000,
  radian: 0,
  planetSize: 6,
  planetColor: '#666666',
  isSatelite: false,
  satelites: []
}];

/**
 * Creates all the planets
 */
var create = function(data, parent) {

  for(var z = 0; z < data.length; z += 1) {

    var item = data[z];

    var planet = new STL.CanvasDisplayObject();
    planet.name = item.name;
    planet.x = item.x;
    planet.y = item.y;
    planet.extra.radius = item.radius;
    planet.extra.speed = item.speed;
    planet.extra.degree = item.degree;
    planet.extra.radian = item.radian;
    planet.extra.planetSize = item.planetSize;
    planet.extra.planetColor = item.planetColor;
    planet.extra.isSatelite = item.isSatelite;

    planet.draw = function(){
        context.fillStyle = this.extra.planetColor;
        context.beginPath();
        context.arc(0, 0, this.extra.planetSize, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    };

    planets.push(planet);
    parent.addChild(planet);

    if (item.satelites.length > 0) {
      create(item.satelites, planet);
    }
  }
};

/**
 * Initializing the stage
 */
var initialize = function() {

    //Create the canvas & the context
    canvas = document.getElementById('world');
    context = canvas.getContext('2d');

    //Create the first object that will call it stage
    stage = new STL.CanvasDisplayObject();
    stage.name = 'Stage';

    //Moving the stage
    stage.x = 0;//CANVAS_WIDTH * 0.5;
    stage.y = 0;//CANVAS_HEIGHT * 0.5;

    sun = new STL.CanvasDisplayObject();
    sun.name = 'Sun';
    sun.x = CANVAS_WIDTH * 0.5;
    sun.y = CANVAS_HEIGHT * 0.5;

    //Create the gradient for the sun
    sunGrad = context.createRadialGradient(0,0,0,0,0,25);
    sunGrad.addColorStop(0, '#fdd86b');
    sunGrad.addColorStop(1, '#cc9900');

    sun.draw = function(){

        context.fillStyle = sunGrad;
        context.beginPath();
        context.arc(0, 0, 20, 0, Math.PI*2, true);
        context.closePath();
        context.fill();

    };

    stage.addChild(sun);

    // Creating the rings
    for (var l = 0; l < totalRings; l += 1){
      var ring = new STL.CanvasDisplayObject();
      ring.name = 'Ring' + l;
      ring.x = CANVAS_WIDTH * 0.5;
      ring.y = CANVAS_HEIGHT * 0.5;
      ring.extra.radius = 60 + (l * 30);
      ring.draw = function(){
        context.strokeStyle = "rgba(62,76,129,0.8)";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(0, 0, this.extra.radius, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
      }

      stage.addChild(ring);

    }

    create(data, stage);

    //Set the canvas width
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    //Start drawing
    setInterval(draw, 1000/60);

};

var draw = function() {

    t++;

    //Clear the canvas
    canvas.width = CANVAS_WIDTH;

    var d = 0;

    for( d = 0; d < planets.length; d++){

        var offsetX = 0;
        var offsetY = 0;

        planets[d].extra.degree += planets[d].extra.speed;
        planets[d].extra.radian = (planets[d].extra.degree/180)*Math.PI;

        if(planets[d].extra.isSatelite === false){
            offsetX = CANVAS_WIDTH * 0.5;
            offsetY = CANVAS_HEIGHT * 0.5;
        } else {
            offsetX = 0;
            offsetY = 0;
        }

        planets[d].x = (Math.cos(planets[d].extra.radian) * planets[d].extra.radius) + offsetX;
        planets[d].y = (-Math.sin(planets[d].extra.radian) * planets[d].extra.radius) + offsetY;

        offsetX = null;
        offsetY = null;
    }

    d = null;

    //Update the stage
    stage.update(context);

};
  
initialize();
  
}());