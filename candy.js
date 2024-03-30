
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;


var selectedCandy;
var destinationCandy;


window.onload = function() {
    score=0
    startGame();

    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let img = document.createElement("img");
            img.id = r.toString() + "-" + c.toString();
            img.src = "./images/" + randomCandy() + ".png";

            //DRAG FUNCTIONALITY
            img.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            img.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            img.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            img.addEventListener("dragleave", dragLeave); //leave candy over another candy
            img.addEventListener("drop", dragDrop); //dropping a candy over another candy
            img.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

            document.getElementById("board").append(img);
            row.push(img);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    //this refers to img that was clicked on for dragging
    
    selectedCandy = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target img that was dropped on
    destinationCandy = this;
}

function dragEnd() {

    if (selectedCandy.src.includes("blank") || destinationCandy.src.includes("blank")) {
        return;
    }
    

    let currImg = selectedCandy.id.split("-"); // id="0-0" -> ["0", "0"];
    let r = parseInt(currImg[0]);
    let c = parseInt(currImg[1]);

    let otherImg = destinationCandy.id.split("-");
    let r2 = parseInt(otherImg[0]);
    let c2 = parseInt(otherImg[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = selectedCandy.src;
        let otherImg = destinationCandy.src;
        selectedCandy.src = otherImg;
        destinationCandy.src = currImg;
        

        let validMove = checkValid();
        if (!validMove) {
            let currImg = selectedCandy.src;
            let otherImg = destinationCandy.src;
            selectedCandy.src = otherImg;
            destinationCandy.src = currImg;    
        }
        
    }
}

function crushCandy() {//it Will call the function of crushThree and crushFour
 
    
    crushThree();
    crushFour();
   
    document.getElementById("score").innerText = score;
    
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        } 
    }

    return false;
}




function generateCandy() {
    for (let c = 0; c < columns;  c++) {
        for(let r=0;r<rows;r++)
        {
        if (board[r][c].src.includes("blank")) {
            board[r][c].src = "./images/" + randomCandy() + ".png";
        }
    }
    }
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function crushFour() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];

            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40; // Adjust the score as needed
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];

            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40; // Adjust the score as needed
            }
        }
    }
 }