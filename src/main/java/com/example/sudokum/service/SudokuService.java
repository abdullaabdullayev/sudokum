package com.example.sudokum.service;

import org.springframework.stereotype.Service;

@Service
public class SudokuService {
    public int[][] generateNewBoard(){
        int[][] board = new int[9][9];

        return board;
    }

    public boolean numberExists(int[][] board, int number){
        for(int i = 0; i < 9; i++){
            for(int j = 0; j < 9; j++){
            }
        }

        return false;
    }
}
