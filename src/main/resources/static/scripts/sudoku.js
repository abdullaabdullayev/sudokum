let selectedTile = null;   
let selectedNumber = null; 


function setupBoardStructure() {
    const board = document.getElementById("sudoku-board");
    if (!board) return;
    board.innerHTML = "";

    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i; 

        tile.addEventListener("click", function() {
            if (this.classList.contains("fixed-tile")) return;

            
            if (selectedNumber !== null) {
                this.innerText = selectedNumber;
                
                this.style.backgroundColor = "#e2eefb";
                setTimeout(() => { this.style.backgroundColor = ""; }, 200);
            }

            
            if (selectedTile) {
                selectedTile.classList.remove("selected-tile");
            }
            selectedTile = this;
            selectedTile.classList.add("selected-tile");
        });

        board.appendChild(tile);
    }
}


function fillBoard(data) {
    const tiles = document.querySelectorAll(".tile");

    
    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        let value = data[row][col];

        if (value !== 0) {
            tiles[i].innerText = value;
            tiles[i].classList.add("fixed-tile"); 
        } else {
            tiles[i].innerText = "";
            tiles[i].classList.remove("fixed-tile");
        }
    }
}


document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", function() {
        
        document.querySelector(".number.active-btn")?.classList.remove("active-btn");
        this.classList.add("active-btn");

        
        if (this.classList.contains("delete")) {
            selectedNumber = "";
        } else {
            selectedNumber = this.innerText;
        }

        
        if (selectedTile) {
            selectedTile.innerText = selectedNumber;
        }
    });
});


document.addEventListener("click", function(event) {
    const board = document.getElementById("sudoku-board");
    const numberPad = document.getElementById("number-pad");

    
    if (!board.contains(event.target) && !numberPad.contains(event.target)) {
        if (selectedTile) {
            selectedTile.classList.remove("selected-tile"); 
            selectedTile = null; 
        }

        

        selectedNumber = null;
        document.querySelector(".number.active-btn")?.classList.remove("active-btn");

    }
});


window.onload = function() {
    setupBoardStructure(); 

    
    fetch('/home-page/generate')
        .then(response => {
            if (!response.ok) throw new Error("Server xətası!");
            return response.json();
        })
        .then(data => {
            fillBoard(data); 
        })
        .catch(err => {
            console.error("Oyun yüklənmədi:", err);
            alert("Xəta: Java serveri rəqəmləri göndərə bilmədi.");
        });
};


document.addEventListener("keydown", (event) => {
    if (!selectedTile) return;
    if (event.key >= "1" && event.key <= "9") {
        selectedTile.innerText = event.key;
    } else if (event.key === "Backspace" || event.key === "Delete") {
        selectedTile.innerText = "";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (selectedTile) {
            selectedTile.classList.remove("selected-tile");
            selectedTile = null;
        }
    }
});


document.getElementById("submit-btn").addEventListener("click", function() {
    const tiles = document.querySelectorAll(".tile");
    let board = [];
    let isComplete = true;

    
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            let val = tiles[i * 9 + j].innerText;
            if (val === "") {
                isComplete = false;
                row.push(0);
            } else {
                row.push(parseInt(val));
            }
        }
        board.push(row);
    }

    if (!isComplete) {
        alert("Please fill in all the cells before submitting!");
        return;
    }

    
    if (isValidSudoku(board)) {
        alert("Congratulations! You've solved the puzzle! 🎉");
    } else {
        alert("Oops! Some numbers are incorrect. Please check again.");
    }
});


function isValidSudoku(board) {
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        let colSet = new Set();
        let boxSet = new Set();

        for (let j = 0; j < 9; j++) {
            
            if (rowSet.has(board[i][j])) return false;
            rowSet.add(board[i][j]);

            
            if (colSet.has(board[j][i])) return false;
            colSet.add(board[j][i]);

            
            let r = 3 * Math.floor(i / 3) + Math.floor(j / 3);
            let c = 3 * (i % 3) + (j % 3);
            if (boxSet.has(board[r][c])) return false;
            boxSet.add(board[r][c]);
        }
    }
    return true;
}