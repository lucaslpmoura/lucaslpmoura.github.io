let numOfClicks = 0;

let shapePoints = [];

const TRIANGLE = 3;
const RECTANGLE = 2;

let selectedShape = TRIANGLE;

let currentColor = [0, 100, 0];


let width = 1600;
let height = 900;
let drawWidth = 0.75 * width;

let shapes = [];

let autoGenerate = false;
let toggleDebug = true;

document.getElementById("shape_select_button").innerHTML = "Triangles";
document.getElementById("shape_select_button").onclick = changeSelectedShape;
document.getElementById("auto_button").onclick = autoGenerateShapes;
document.getElementById("toggle_debug_button").onclick = toggleDebugFunc;
document.getElementById("clear_shapes_button").onclick = clearShapes;
//document.getElementById("back_button").onclick = () => { window.location.href = "../index.html" };

let triangleSlider, rectangleSlider;
let sliderList = [];
let baseTriangleGenerationInterval = 2000;
let baseRectangleGenerationInterval = 2000;

function setup() {
    createCanvas(width, height);
    triangleSlider = createSlider(0, 1500);
    rectangleSlider = createSlider(0, 1500);

    triangleSlider.position(drawWidth + 10, 30); // Generation speed adjustment sliders
    rectangleSlider.position(drawWidth + 10, 70); // Generation speed adjustment sliders

    triangleSlider.hide();
    rectangleSlider.hide();

    triangleSlider.value(750);
    rectangleSlider.value(750);
}

function draw() {

    background(127);
    fill(100, 100, 100);
    rect(drawWidth, 0, width, height);
    if (numOfClicks % selectedShape == 0 && numOfClicks > 0) {
        generateShape(shapePoints, [random(0, 255), random(0, 255), random(0, 255)]);
        numOfClicks = 0;
    }



    /*
    The shapes data structure is made of:
    shape = [ [[x1,y1],[x2,y2]...], [r,g,b]]
    where shape[0] is a list of the points used to draw the shape (triangles use 3, rects use 2)
    and shape[1] is the color vector with rgb values
    */
    for (let i = 0; i < shapes.length; i++) {
        fill(shapes[i][1][0], shapes[i][1][1], shapes[i][1][2]);
        if (shapes[i][0].length == TRIANGLE) {
            triangle(
                shapes[i][0][0][0], shapes[i][0][0][1],
                shapes[i][0][1][0], shapes[i][0][1][1],
                shapes[i][0][2][0], shapes[i][0][2][1]
            )
        }
        if (shapes[i][0].length == RECTANGLE) {
            rectMode(CORNERS);
            rect(
                shapes[i][0][0][0], shapes[i][0][0][1],
                shapes[i][0][1][0], shapes[i][0][1][1]
            )
        }

    }
    drawDebugElements();
    drawLabels();

}

function drawDebugElements() {
    if (toggleDebug) {
        fill(200);

        let textSpacing = 20;
        text(`Num Of Clicks: ${numOfClicks}`, 10, textSpacing * 1)
        text(`Auto-generate: ${autoGenerate}`, 10, textSpacing * 2)
        text(`Debug mode: ${toggleDebug}`, 10, textSpacing * 3)
        text(`Selected Shape: ${selectedShape}`, 10, textSpacing * 4)

        text('Points: ', 10, textSpacing * 5);
        for (let i = 0; i < shapePoints.length; i++) {
            text(`${shapePoints[i]}`, 10, textSpacing * (6 + i));
        }

    }

}

function mouseClicked() {
    if (autoGenerate) {
        return;
    }
    if ((numOfClicks % selectedShape == 0)) {
        shapePoints = [];
    }
    if (numOfClicks > -1) {
        point = [0, 0];
        point[0] = mouseX > drawWidth ? drawWidth : mouseX;
        point[1] = mouseY > height ? height : mouseY;
        shapePoints.push(point.slice());
    }


    numOfClicks++
    console.log(shapes);
}

function generateShape(points, color) {
    console.log("Generating shape");
    shapes.push([points, color]);
}

function changeSelectedShape() {
    switch (selectedShape) {
        case TRIANGLE:
            document.getElementById("shape_select_button").innerHTML = "Rectangles";
            selectedShape = RECTANGLE;
            break;
        case RECTANGLE:
            document.getElementById("shape_select_button").innerHTML = "Triangles";
            selectedShape = TRIANGLE;
            break;
        default:
            selectedShape = TRIANGLE;
    }
    numOfClicks = -1;
}

async function autoGenerateShapes() {
    //clear();
    drawDebugElements();
    numOfClicks = -1;
    autoGenerate = !autoGenerate;

    if (autoGenerate) {
        document.getElementById("auto_button").innerHTML = "Stop Generating Shapes";
        showSliders(true);

    } else {
        document.getElementById("auto_button").innerHTML = "Auto Generate Shapes";
        showSliders(false);
    }

    if (autoGenerate) {
        autoGenerateTriangles();
        autoGenerateRectangles();
    }

}

async function autoGenerateTriangles() {
    while (autoGenerate) {
        promise = await new Promise(resolve => setTimeout(resolve, baseTriangleGenerationInterval - triangleSlider.value()));
        console.log("Generating triangle...");
        if (autoGenerate) {
            generateShape(
                [
                    [random(0, drawWidth), random(0, height)],  // Points A, B, C
                    [random(0, drawWidth), random(0, height)],
                    [random(0, drawWidth), random(0, height)],
                ],
                [
                    random(0, 255), random(0, 255), random(0, 255), // Color Vector
                ]
            )
        }
    }

}

async function autoGenerateRectangles() {
    while (autoGenerate) {
        promise = await new Promise(resolve => setTimeout(resolve, baseRectangleGenerationInterval - rectangleSlider.value()));
        console.log("Generating triangle...");
        if (autoGenerate) {
            generateShape(
                [
                    [random(0, drawWidth), random(0, height)],  // Rectangle Corners
                    [random(0, drawWidth), random(0, height)],
                ],
                [
                    random(0, 255), random(0, 255), random(0, 255), // Color Vector
                ]
            )
        }
    }

}

function toggleDebugFunc() {
    toggleDebug = !toggleDebug;
    numOfClicks = -1;
}

function clearShapes() {
    shapes = [];
    numOfClicks = -1;
}


function showSliders(needToShow) {
    if (needToShow && sliderList.length == 0) {
        triangleSlider.show();
        rectangleSlider.show();

    }
    if (!needToShow) {
        console.log("Deleting Slider...");
        triangleSlider.hide();
        rectangleSlider.hide();
    }
}

function drawLabels() {
    if (autoGenerate) {
        fill(255);
        text("Triangle Generation Speed", drawWidth + 10, 40); // Triangle Speed Slider label
        text("Rectangle Generation Speed", drawWidth + 10, 75); // Triangle Speed Slider label
        let triangleSpeed = 1 / (baseTriangleGenerationInterval - triangleSlider.value()) * 1000;
        let rectangleSpeed = 1 / (baseRectangleGenerationInterval - rectangleSlider.value()) * 1000;
        text(`${triangleSpeed.toFixed(2)} Triangles/s`, drawWidth + 180, 25);
        text(`${rectangleSpeed.toFixed(2)} Rectangles/s`, drawWidth + 180, 55);
    }
}