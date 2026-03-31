package com.example.sudokum.service;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class SudokuService {
    public static int[][] generateNewBoard() {
        Random random = new Random();
        int[][] board = new int[9][9];

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                int attempts = 0; 
                int randomNumber = random.nextInt(9) + 1;

                
                while (numberExists(board, randomNumber, i, j)) {
                    randomNumber = random.nextInt(9) + 1;
                    attempts++;

                    
                    if (attempts > 100) {
                        
                        for (int k = 0; k < 9; k++) board[i][k] = 0;
                        j = -1; 
                        break;
                    }
                }

                if (j != -1) {
                    board[i][j] = randomNumber;
                }
            }
        }
        return board;
    }

    public static boolean numberExists(int[][] board, int number, int row, int col) {
        
        for (int c = 0; c < 9; c++) {
            if (board[row][c] == number) return true;
        }

        
        for (int r = 0; r < 9; r++) {
            if (board[r][col] == number) return true;
        }

        
        
        int boxRowStart = row - row % 3;
        int boxColStart = col - col % 3;

        for (int r = boxRowStart; r < boxRowStart + 3; r++) {
            for (int c = boxColStart; c < boxColStart + 3; c++) {
                if (board[r][c] == number) return true;
            }
        }

        return false;
    }

    public static int[][] removeDigitsSymmetric(int[][] newBoard, int totalToRemove) {
        Random rand = new Random();
        int removed = 0;

        while (removed < totalToRemove) {
            int r = rand.nextInt(9);
            int c = rand.nextInt(9);

            if (newBoard[r][c] != 0) {
                
                newBoard[r][c] = 0;
                removed++;

                
                int symR = 8 - r;
                int symC = 8 - c;

                if (newBoard[symR][symC] != 0 && removed < totalToRemove) {
                    newBoard[symR][symC] = 0;
                    removed++;
                }
            }
        }
        return newBoard;
    }
}
