package com.example.sudokum.controller;

import com.example.sudokum.service.SudokuService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/home-page")
public class GameController {

    @GetMapping("/generate")
    public int[][] generateSudoku(){
        int[][] board = SudokuService.generateNewBoard();
        System.out.println("===============================BOARD============================");
        System.out.println(Arrays.deepToString(board));
        System.out.println("================================================================");
        return SudokuService.removeDigitsSymmetric(board,37);
    }
}