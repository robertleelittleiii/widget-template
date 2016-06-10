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