"use strict";

const anitext = (function(){
    const app = {
        dots: [],
        colors: [],
        run: (() => {
            document.body.style.margin = 0;
            document.body.style.padding = 0;

            let boxes = document.querySelector('.boxes');
            boxes.style.maxWidth = '100vw';
            boxes.style.maxHeight = '100vh';
            boxes.style.width = '100vw';
            boxes.style.height = '100vh';
            boxes.style.overflow = 'hidden';

            // app.colors = app.gradient();
            for (let c = 0;c < 333;c++) {
                app.colors.push(app.randomColor());
            }

            const rect = boxes.getBoundingClientRect();
            const w = rect.width / 8;
            const h = rect.height / 8;
            for (let i = 0; i < w; i++) {
                for (let j = 0; j < h; j++) {
                    let bX = document.createElement('div');
                    bX.style.width = '8px';
                    bX.style.height = '8px';
                    bX.style.float = 'left';
                    boxes.append(bX);
                    app.dots.push(bX);
                }
            }

            app.loop();
        }),
        loop: (() => {
            app.dots.forEach((dot) => {
                let rC = app.colors[Math.floor(Math.random() * app.colors.length)];
                dot.animate({background: rC}, {duration: 3000, fill: 'forwards'});
            });

            setTimeout(() => {
                app.loop();
            }, 3333);
        }),
        randomColor: (() => {
            return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        }),
        gradient: (() => {
            return app.getColorArray(33, '#e5ed0e', '#3509f7');
        }),
        processHEX: ((val) => {
            //does the hex contain extra char?
            let hex = (val.length >6)?val.substr(1, val.length - 1):val;
            // is it a six character hex?
            let r;
            let g;
            let b;
            if (hex.length > 3) {
          
              //scrape out the numerics
              r = hex.substr(0, 2);
              g = hex.substr(2, 2);
              b = hex.substr(4, 2);
          
              // if not six character hex,
              // then work as if its a three character hex
            } else {
          
              // just concat the pieces with themselves
              r = hex.substr(0, 1) + hex.substr(0, 1);
              g = hex.substr(1, 1) + hex.substr(1, 1);
              b = hex.substr(2, 1) + hex.substr(2, 1);
          
            }
            // return our clean values
              return [
                parseInt(r, 16),
                parseInt(g, 16),
                parseInt(b, 16)
              ]
        }),
        getColorArray: ((steps, val1, val2) => {  
            let val1RGB = app.processHEX(val1);
            let val2RGB = app.processHEX(val2);
            let colors = [];
          
            //the number of steps in the gradient
            let stepsInt = parseInt(steps, 10);
            //the percentage representation of the step
            let stepsPerc = 100 / (stepsInt+1);
          
            // diffs between two values 
            let valClampRGB = [
                val2RGB[0] - val1RGB[0],
                val2RGB[1] - val1RGB[1],
                val2RGB[2] - val1RGB[2]
            ];
            
            // build the color array out with color steps
            for (let i = 0; i < stepsInt; i++) {
                let clampedR = (valClampRGB[0] > 0) 
                ? app.pad((Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1)))).toString(16), 2) 
                : app.pad((Math.round((val1RGB[0] + (valClampRGB[0]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);
                
                let clampedG = (valClampRGB[1] > 0) 
                ? app.pad((Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1)))).toString(16), 2) 
                : app.pad((Math.round((val1RGB[1] + (valClampRGB[1]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);
                
                let clampedB = (valClampRGB[2] > 0) 
                ? app.pad((Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1)))).toString(16), 2) 
                : app.pad((Math.round((val1RGB[2] + (valClampRGB[2]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2);
                colors[i] = [
                  '#',
                  clampedR,
                  clampedG,
                  clampedB
                ].join('');
            }
            
            return colors;
        }),
        pad: ((n, width, z) => {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        })
    }

    module.exports = app;
    app.run();
})();
