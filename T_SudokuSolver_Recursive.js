/*
	Author: 	Tolu Olunubi
	Function:   TDD Recursive Sudoku Solver
	---------------------------------------

	SOLUTION ALGORITHM
	------------------
	* Recursive inputs should be: [row num], [col num], and [cell entry number] for solution
	1) Check [Current Cell] if it is initialized:
		<> If initialized:
			2) Check if preceding motion was fwd or bkwd
			<> If fwd:
				3) Modify row and col values accordingly to move forward to next cell - this function should also be able to modify row and col for backward movement
				4) Set [preceding_motion] variable to 'fwd'
			<> If bkwd:
				5) Modify row and col values accordingly to move backward to next cell
				6) Set [preceding_motion] variable to 'bkwd'
			7) Reset [cell_attempt_count] to 0
			8) **CALL FUNCTION AGAIN** with NEW row and col values from [3], along with SAME initial cell entry number.
		<> If not initialized:
			9) Check if cell is empty:
				<> If cell is empty:
					10) Check if entry number passes the 3 rules [row, col, and 3x3 box] - each rule is a function that returns true or false
						<> If it passes:
							11) Insert it into the cell
							12) Use function from [3] to modify row and col values accordingly to move forward to the next cell
							13) Set [preceding_motion] variable to 'fwd'
							14) Check entry number if it is less than 9:
								<> If less:
									15) Increment the number
								<> If greater:
									16) Reset to 1
									17) Reset [cell_attempt_count] to 0
									18) **CALL FUNCTION AGAIN** with NEW row and col values from [8], along with new cell entry number from [10] or [11]
						<> If it fails:
							19) Increment [cell_attempt_count] variable - this variable should be global to be applicable across all recursive calls. should be reset when solution moves to next cell
							20) Check [cell_attempt_count]:
								<> If less than 9 attempts:
									21) Use function from [14] to perform [15] or [16] on current entry number
									22) **CALL FUNCTION AGAIN** with SAME row and col values, along with new cell entry number
								<> If more than 9 attempts:
									23) Use function from [3] to modify row and col values accordingly for movement BACKWARDS to previous cell
									24) Set [preceding_motion] variable to 'bkwd'
									25) Reset [cell_attempt_count] to 0
									26) **CALL FUNCTION AGAIN** with NEW row and col values from [23], along with new cell entry number from [20]
				<> If cell is not empty: //must have arrived here because of Steps 18 to 22
					27) Read the number in the cell
					28) Use function from [14] to perform [15] or [16] on the number read in [27]
					29) Clear cell content to make it empty - so as to naturally reuse Steps 6 to 22 without making new instances of the functions
					30) Reset [cell_attempt_count] to 0
					31) **CALL FUNCTION AGAIN** with SAME row and col in [23], along with same cell entry number [which must be an incremented version of the original cell entry...but stpes 18 to 22 must have handled it] 

	BREAK DOWN OF STEPS INTO FUNCTIONS
	----------------------------------
	 A - A function to initialize the table on screen with user input
	 1 - Step [1] is a function that returns true or false
	 * - Step [2] is not a function
	 2 - Step [3] is a function that takes in a 2-element array and returns a 2-element array. As such row and col should be defined as var cell = ['row num','col num']
	 * - Step [4] not a function
	 * - Step [5] uses function from Step [3]
	 * - Step [6] is not a function
	 * - Step [7] is not a function
	 * - Step [8] is a recursive call on main Sudoku function
	 3 - Step [9] is a function that returns true or false - just to thoroughly perform check - only let it look for values 1 to 9. Any other thing is considered an empty
	 4 - Step [10] is a function that calls 3 functions, and returns true or false. Each of the 3 functions also return true or false
	 5 - Step [10_1] is a function to check the row rule. It returns true or false
	 6 - Step [10_2] is a function to check the col rule. It returns true or false
	 7 - Step [10_3] is a function to check the 3x3 box rule. It returns true or false
	 * - Step [11] is not a function
	 * - Step [12] uses function from Step [3]
	 * - Step [13] is not a function
	 8 - Step [14 to 16] are one function that returns a new cell entry number based on the number passed into it - the if will be within the function
	 * - Step [17] is not a function
	 * - Step [18] is a recursive call on main Sudoku function
	 * - Step [19] is not a function
	 * - Step [20] is not a function
	 * - Step [21] uses function from Step [14]
	 * - Step [22] is a recursive call on main Sudoku function
	 * - Step [23] uses function from Step [3]
	 * - Step [24] is not a function
	 * - Step [25] is not a function
	 * - Step [26] is a recursive call on main Sudoku function
	 * - Step [27] is not a function
	 * - Step [28] uses function from Step [14]
	 * - Step [29] is not a function
	 * - Step [30] is not a function
	 * - Step [31] is a recursive call on main Sudoku function

-------------------------------------------------------------------------------------------------------------------------------------------------------------------
*/

// A - Function to Initialize table
	$('td').click(function(){
		var cellID = $(this).attr('id');
		var cell = [this.parentNode.rowIndex, this.cellIndex];
		var initCellVal = prompt("Enter a number, or blank to erase", "");
		if (initCellVal && initCellVal != " ") {
			//check that entry is a number between 1 and 9
			if(initCellVal >= 1 && initCellVal <= 9) {
				if (entry_number_passes_rules(initCellVal, cell) == true) {
					document.getElementById($(this).attr('id')).innerHTML = initCellVal;
					document.getElementById($(this).attr('id')).className = "Init";
				} else {
					alert("The number you entered exists in the row, col or 3x3 box");
				}
			} else {
				alert("Please enter a number between 1 and 9");
			}
		} else {
			document.getElementById($(this).attr('id')).innerHTML = "";
		}
	});

// 1 - Funtion to check if a given cell is initialized
	// cell is an array that holds the row and col values
function is_cell_initialized (cell) {
	if (is_cell_coord_valid(cell) == true) {
		if (document.getElementById('cell_' + cell[0] + cell[1]).className == "Init") {
			return true;
		} else {
			return false;
		}
	} else {
		throw new Error('Cell coordinate: ' + cell[0] + ', ' + cell[1] + ' is invalid');
	}
}

// Function to check if the cell coordinate [row, col] is valid
function is_cell_coord_valid(cell) {
	if (cell[0] >= 0 && cell[0] <= 8 && cell[1] >= 0 && cell[1] <= 8) {
		return true;
	} else {
		return false;
	}
}

// 2 - Function to modify row and col values to move to forward or backward on sudoku board
	// cell is an array that holds the row and col values
	// direction is a string that holds "fwd" or "bkwd" - it determines how cell1 values are changed
function move_cell (cell, direction) {
	var row = 0, col = 0;
	if (is_cell_coord_valid(cell) === true) {
		if (direction == "fwd") {
			if (cell[1] == 8) {
				if (cell[0] < 8) {
					row = cell[0] + 1;
					col = 0;
				} else if (cell[0] == 8) {
					return [8, 9];
				}
			} else { //cell[1] < 8
				col = cell[1] + 1;
				row = cell[0];
			}
		} else if (direction == "bkwd") {
			if (cell[1] == 0) { //col=0
				if (cell[0] > 0) {
					row = cell[0] - 1;
					col = 8;
				} else if (cell[0] == 0) {
					throw new Error('No backward movement beyond 0, 0');
				}
			} else { //cell[1] > 0
				col = cell[1] - 1;
				row = cell[0];
			}
		} else {
			throw new Error('Direction string input is invalid');
		}
	} else {
		throw new Error('Cell coordinate: ' + cell[0] + ', ' + cell[1] + ' is invalid');
	}
	var new_cell = [row, col];
	return new_cell;
}

// 3 - Function to check if specified cell is empty
	// cell is a two-element array holding row and col values
	// returns true or false
function is_cell_empty (cell) {
	if (is_cell_coord_valid(cell) === true) {
		var cell_ID = "cell_" + cell[0] + cell[1];
		var cell_val = Number(document.getElementById(cell_ID).innerHTML);
		if (cell_val >= 1 && cell_val <= 9) {
			return false; //cell has a valid content - a number between 1 and 9
		} else { //cell is empty or has an invalid content
			return true;
		}
	} else {
		throw new Error('Cell coordinate: (' + cell[0] + ', ' + cell[1] + ') is invalid');
	}
}

// 4 - Function to check if entry number passes Sudoku rules before being placed on the board
	// takes in entry number to be attempted
	// returns true or false
function entry_number_passes_rules (entry_number, cell) {
	if (entry_number >= 1 && entry_number <= 9) {
		if (is_cell_coord_valid(cell) === true) {
			var row_rule_result = entry_number_passes_row_rule (entry_number, cell);
			var col_rule_result = entry_number_passes_column_rule (entry_number, cell);
			var box_rule_result = entry_number_passes_box_rule (entry_number, cell);
			if (row_rule_result == true && col_rule_result == true && box_rule_result == true) {
				return true;
			} else {
				return false;
			}
		} else {
			throw new Error('Cell coordinate: (' + cell[0] + ', ' + cell[1] + ') is invalid');
		}
	} else {
		throw new Error('Entry number ' + entry_number + ' is invalid');
	}
	//will return true or false
}

// 5 - Function to check if entry number passes Sudoku row rule before being placed on the board
	// takes in entry number to be attempted
	// returns true or false
function entry_number_passes_row_rule (entry_number, cell) {
	if (entry_number >= 1 && entry_number <= 9) {
		if (is_cell_coord_valid(cell) === true) {
			var i;
			var cell_ID;
			for (i = 0; i <= 8; i++) {
				cell_ID = "cell_" + cell[0] + i;
				if (entry_number == document.getElementById(cell_ID).innerHTML) {
					return false;
				}
			}
			return true;
		} else {
			throw new Error('Cell coordinate: (' + cell[0] + ', ' + cell[1] + ') is invalid');
		}
	} else {
		throw new Error('Entry number ' + entry_number + ' is invalid');
	}
}

// 6 - Function to check if entry number passes Sudoku column rule before being placed on the board
	// takes in entry number to be attempted
	// returns true or false
function entry_number_passes_column_rule (entry_number, cell) {
	if (entry_number >= 1 && entry_number <= 9) {
		if (is_cell_coord_valid(cell) === true) {
			var i;
			var cell_ID;
			for (i = 0; i <= 8; i++) {
				cell_ID = "cell_" + i + cell[1];
				if (entry_number == document.getElementById(cell_ID).innerHTML) {
					return false;
				}
			}
			return true;
		} else {
			throw new Error('Cell coordinate (' + cell[0] + ', ' + cell[1] + ') is invalid');
		}
	} else {
		throw new Error('Entry number ' + entry_number + ' is invalid');
	}
}

// Function to determine the 3x3 box that a cell [row, col] belongs to
	// return one four element array containing numbers that represent the edge boundaries of the 3x3 box
function determine_cell_box_boundaries (cell) {
	if (is_cell_coord_valid(cell) === true) {
		var row_start_index, col_start_index;
		var row_max_index, col_max_index;

		if (cell[0] >= 0 && cell[0] <= 2) {
			row_start_index = 0;
			row_max_index = 2;
		} else if (cell[0] >= 3 && cell[0] <= 5) {
			row_start_index = 3;
			row_max_index = 5;
		} else if (cell[0] >= 6 && cell[0] <= 8) {
			row_start_index = 6;
			row_max_index = 8;
		}

		if (cell[1] >= 0 && cell[1] <= 2) {
			col_start_index = 0;
			col_max_index = 2;
		} else if (cell[1] >= 3 && cell[1] <= 5) {
			col_start_index = 3;
			col_max_index = 5;
		} else if (cell[1] >= 6 && cell[1] <= 8) {
			col_start_index = 6;
			col_max_index = 8;
		}

		box_boundaries = [row_start_index, row_max_index, col_start_index, col_max_index];
		return box_boundaries;
	} else {
		throw new Error('Cell coordinate (' + cell[0] + ', ' + cell[1] + ') is invalid');
	}
}

// 7 - Function to check if entry number passes Sudoku 3x3 box rule before being placed on the board
	// takes in entry number to be attempted
	// returns true or false
function entry_number_passes_box_rule (entry_number, cell) {
	if (entry_number >= 1 && entry_number <= 9) {
		if (is_cell_coord_valid(cell) === true) {
			var box_boundaries = determine_cell_box_boundaries (cell);
			var i, j;
			var cell_ID;
			for (i = box_boundaries[0]; i <= box_boundaries[1]; i++) {
				for (j = box_boundaries[2]; j <= box_boundaries[3]; j++) {
					cell_ID = "cell_" + i + j;
					if (entry_number == document.getElementById(cell_ID).innerHTML) {
						return false;
					}
				}
			}
			return true;
		} else {
			throw new Error('Cell coordinate (' + cell[0] + ', ' + cell[1] + ') is invalid');
		}
	} else {
		throw new Error('Entry number ' + entry_number + ' is invalid');
	}
}

// 8 - Function to generate a new entry number for another solution atttempt
	// takes in existing entry number
	// returns new entry number
function generate_new_entry_number (entry_number) {
	if (entry_number >= 1 && entry_number <= 9)  {
		var new_entry_number;
		if (entry_number < 9) {
			new_entry_number = entry_number + 1;
			return new_entry_number;
		} else {
			new_entry_number = 1;
			return new_entry_number;
		}
	} else {
		throw new Error('Entry number ' + entry_number + ' is invalid');
	}
}

// Function to Integrate all other functions to Solve the Sudoku Puzzle
	// takes no input
	// returns nothing
		var cell = [0, 0];
		var base_cell = [8, 9];
		var entry_number = 1;
		var read_number; //from screen
		var cell_attempt_count = 0;
		var preceding_motion = 'fwd'; //could be fwd or bkwd

	function solve_sudoku () {
		if (cell[0] == base_cell[0] && cell[1] == base_cell[1]) {
			return; //sudoku has been fully solved!
		}
	/*Step 1*/ 	if (is_cell_initialized(cell) == true) {
	/*Step 2*/		if (preceding_motion == 'fwd') {
	/*Step 3*/ 			cell = move_cell(cell, 'fwd'); //reusing cell variable
	/*Step 4*/			preceding_motion = 'fwd';
					} else if (preceding_motion == 'bkwd') {
	/*Step 5*/			cell = move_cell(cell, 'bkwd'); //reusing cell variable
	/*Step 6*/			preceding_motion = 'bkwd';
					}
	/*Step 7*/		cell_attempt_count = 0;
	/*Step 8*/		solve_sudoku();
				} else {
	/*Step 9*/		if (is_cell_empty(cell) == true) {
	/*Step 10*/			if (entry_number_passes_rules(entry_number, cell) == true) {
	/*Step 11*/				document.getElementById('cell_'+cell[0]+cell[1]).innerHTML = entry_number;
	/*Step 12*/				cell = move_cell(cell, 'fwd');
	/*Step 13*/				preceding_motion = 'fwd';
	/*Steps 14-16*/			entry_number = generate_new_entry_number (entry_number);
	/*Step 17*/				cell_attempt_count = 0;
	/*Step 18*/				solve_sudoku();
						} else {
	/*Step 19*/				cell_attempt_count++;
	/*Step 20*/				if (cell_attempt_count < 9) {
	/*Step 21*/					entry_number = generate_new_entry_number (entry_number);
	/*Step 22*/					solve_sudoku();
							} else {
	/*Step 23*/					cell = move_cell(cell, 'bkwd');
	/*Step 24*/					preceding_motion = 'bkwd';
	/*Step 25*/					cell_attempt_count = 0;
	/*Step 26*/					solve_sudoku();
							}
						}
					} else {
	/*Step 27*/			entry_number = Number(document.getElementById('cell_'+cell[0]+cell[1]).innerHTML);
	/*Step 28*/			entry_number = generate_new_entry_number (entry_number);
	/*Step 29*/			document.getElementById('cell_'+cell[0]+cell[1]).innerHTML = "";
	/*Step 30*/			cell_attempt_count = 0;
	/*Step 31*/			solve_sudoku();
					}
				}

	}
