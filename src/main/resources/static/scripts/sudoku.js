let selectedTile = null;   // Seçilmiş xana (Versiya 1 üçün)
let selectedNumber = null; // Seçilmiş rəqəm (Versiya 2 üçün)

// 1. Boş lövhə strukturunu yaradan funksiya
function setupBoardStructure() {
    const board = document.getElementById("sudoku-board");
    if (!board) return;
    board.innerHTML = "";

    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.index = i; // Hər xanaya sırasını bildirən data-index veririk

        tile.addEventListener("click", function() {
            if (this.classList.contains("fixed-tile")) return;

            // --- VERSİYA 1: Əgər aşağıdan rəqəm seçilibsə, klikləyəndə yaz ---
            if (selectedNumber !== null) {
                this.innerText = selectedNumber;
                // Yazılma effekti
                this.style.backgroundColor = "#e2eefb";
                setTimeout(() => { this.style.backgroundColor = ""; }, 200);
            }

            // --- VERSİYA 2: Xananı seçirik (mavi çərçivə) ---
            if (selectedTile) {
                selectedTile.classList.remove("selected-tile");
            }
            selectedTile = this;
            selectedTile.classList.add("selected-tile");
        });

        board.appendChild(tile);
    }
}

// 2. Java-dan gələn JSON datasını xanalara dolduran funksiya
function fillBoard(data) {
    const tiles = document.querySelectorAll(".tile");

    // 'data' 9x9-luq bir massivdir: data[row][col]
    for (let i = 0; i < 81; i++) {
        let row = Math.floor(i / 9);
        let col = i % 9;
        let value = data[row][col];

        if (value !== 0) {
            tiles[i].innerText = value;
            tiles[i].classList.add("fixed-tile"); // Java-dan gələn rəqəmləri kilidləyirik
        } else {
            tiles[i].innerText = "";
            tiles[i].classList.remove("fixed-tile");
        }
    }
}

// 3. Rəqəm düymələri (Numpad) və Silmə düyməsi
document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", function() {
        // Düymələrin vizual aktivliyini idarə et
        document.querySelector(".number.active-btn")?.classList.remove("active-btn");
        this.classList.add("active-btn");

        // Seçilmiş rəqəmi və ya silmə rejimini yadda saxla
        if (this.classList.contains("delete")) {
            selectedNumber = "";
        } else {
            selectedNumber = this.innerText;
        }

        // Əgər yuxarıda bir xana seçilibsə, düyməyə basan kimi ora yaz
        if (selectedTile) {
            selectedTile.innerText = selectedNumber;
        }
    });
});

// Lövhədən kənara klikləyəndə seçimi ləğv etmək üçün:
document.addEventListener("click", function(event) {
    const board = document.getElementById("sudoku-board");
    const numberPad = document.getElementById("number-pad");

    // Əgər kliklənən yer board-un və ya number-pad-in daxilində DEYİLSƏ
    if (!board.contains(event.target) && !numberPad.contains(event.target)) {
        if (selectedTile) {
            selectedTile.classList.remove("selected-tile"); // Mavi çərçivəni sil
            selectedTile = null; // Seçilmiş xananı boşalt
        }

        // İstəyirsənsə, kənara vuranda aşağıdakı yaşıl rəqəmi də ləğv edə bilərsən:

        selectedNumber = null;
        document.querySelector(".number.active-btn")?.classList.remove("active-btn");

    }
});

// 4. Səhifə yüklənəndə işə düşən əsas hissə
window.onload = function() {
    setupBoardStructure(); // Öncə boş lövhəni qururuq

    // Java API-dən Sudoku datasını çəkirik
    fetch('/home-page/generate')
        .then(response => {
            if (!response.ok) throw new Error("Server xətası!");
            return response.json();
        })
        .then(data => {
            fillBoard(data); // Rəqəmləri yerləşdiririk
        })
        .catch(err => {
            console.error("Oyun yüklənmədi:", err);
            alert("Xəta: Java serveri rəqəmləri göndərə bilmədi.");
        });
};

// 5. Bonus: Klaviaturadan istifadə (1-9 və Backspace)
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