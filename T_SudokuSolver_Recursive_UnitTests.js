/*
	Author: 	Tolu Olunubi
	Function:   TDD Recursive Sudoku Solver
	---------------------------------------
*/

// Test Result Object for holding result log of all unit tests for all functions
var TestResult = {
	total: 0, failed: 0
};
var output_value; //to hold function expected output value to be inputed into test functions


// 1 - FUNCTION TO CHECK IF A GIVEN CELL IS INITIALIZED - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------

function is_cell_initialized_TEST (row, col, expected_output) {
	//function takes in cell coordinate [whose value on screen are known] as inputs
	//function tests that the row and col variables are within numbers 0 to 8
	//calls the is_cell_initialized function and passes the cell coordinates into it
	//checks that it correctly returns true or false accordingly - value and boolean type
	TestResult.total++;
	var output;
	var cell = [row, col];
	var err_triggered = false;
	try {
		output = is_cell_initialized (cell);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in is_cell_initialized_TEST: Expected "Cell coordinate: ' + row + ', ' + col + ' is invalid", but got: ' + err.message);
		} 
	}
	if (err_triggered == false) {
		if (expected_output !== output) {
			TestResult.failed++;
			console.log("FAILED in is_cell_initialized_TEST: For cell: (" + row + ", " + col + "), expected " + expected_output + ", but got " + output);
		}
	}
}


// Test Cases
// --------------------------------------------------------------
is_cell_initialized_TEST(4, 2, true); //depends on actual values on screen
is_cell_initialized_TEST(0, 0, false); //depends on actual values on screen
is_cell_initialized_TEST(7, 6, true); //depends on actual values on screen
is_cell_initialized_TEST(9, 2, "Cell coordinate: 9, 2 is invalid");

// FUNCTION TO CHECK IF THE CELL COORDINATE [ROW, COL] IS VALID

// Test function definition
// --------------------------------------------------------------
function is_cell_coord_valid_TEST (row, col, expected_return) {
	TestResult.total++;
	var cell = [row, col];
	var output = is_cell_coord_valid(cell);
	if (expected_return !== output) {
		TestResult.failed++;
		console.log("FAILED in is_cell_coord_valid_TEST: Expected " + expected_return + ", but got " + output);
	}
}

is_cell_coord_valid_TEST(3, 8, true);
is_cell_coord_valid_TEST(7, 5, true);
is_cell_coord_valid_TEST(0, 9, false);

// 2 - FUNCTION TO MODIFY ROW AND COL VALUES, TO MOVE FORWARD OR BACKWARD ON SUDOKU BOARD - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function move_cell_TEST (row, col, direction, expected_output) {
	//function takes in the above inputs
	//function tests that the row and col variables are within numbers 0 to 8
	//passes the row, col, and direction into the move_cell function which returns an array
	//and the values of the array are checked with the expected_row and expected_col
	TestResult.total++;
	var cell = [row, col];
	var newCell;
	var err_triggered = false;

	try {
		newCell = move_cell (cell, direction);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in move_cell_TEST: Expected "'+ expected_output + '", but got: ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (expected_output[0] != newCell[0] || expected_output[1] != newCell[1]) {
			TestResult.failed++;
			console.log("FAILED in move_cell_TEST: For cell: (" + row + ", " + col + "), and " + direction + " direction, expected (" + expected_output[0] + ", " + expected_output[1] + "), but got (" + newCell[0] + ", " + newCell[1] + ")");
		}
	}
}

// Test Cases
// --------------------------------------------------------------
output_value = [4, 4];
move_cell_TEST(4, 3, "fwd", output_value);
output_value = [5, 8];
move_cell_TEST(6, 0, "bkwd", output_value);
move_cell_TEST(9, 3, "bkwd", "Cell coordinate: 9, 3 is invalid");
output_value = [8, 9];
move_cell_TEST(8, 8, "fwd", output_value); 
move_cell_TEST(8, 8, "bwd", "Direction string input is invalid");
move_cell_TEST(5, 6, "fw", "Direction string input is invalid");
move_cell_TEST(0, 0, "bkwd", "No backward movement beyond 0, 0");

// 3 - FUNCTION TO CHECK IF SPECIFIED CELL IS EMPTY - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function is_cell_empty_TEST(row, col, expected_output) {
	TestResult.total++;
	var cell = [row, col];
	var output;
	var err_triggered = false;

	try {
		output = is_cell_empty (cell);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in is_cell_empty_TEST: For (' + row + ', ' + col + '), expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (expected_output != output) {
			TestResult.failed++;
			console.log('FAILED in is_cell_empty_TEST: For (' + row + ', ' + col + '), expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
is_cell_empty_TEST(2, 7, true); //depends on actual values on screen
is_cell_empty_TEST(4, 8, true); //depends on actual values on screen
is_cell_empty_TEST(9, 7, "Cell coordinate: (9, 7) is invalid");

// 4 - FUNCTION TO CHECK IF ENTRY NUMBER PASSES ALL SUDOKU RULES - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function entry_number_passes_rules_TEST (number, row, col, expected_output) {
	TestResult.total++;
	var cell  = [row, col];
	var output;
	var err_triggered = false;

	try {
		output = entry_number_passes_rules(number, cell);
	} 
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in entry_number_passes_rules_TEST: For (' + row + ', ' + col + '), entry number ' + number + ',  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output != expected_output) {
			TestResult.failed++;
			console.log('FAILED in entry_number_passes_rules_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------

entry_number_passes_rules_TEST(7, 5, 6, true); //depends on actual values on screen
entry_number_passes_rules_TEST(0, 2, 1, "Entry number 0 is invalid");
entry_number_passes_rules_TEST(3, 4, 9, "Cell coordinate: (4, 9) is invalid");

// 5 - FUNCTION TO CHECK IF ENTRY NUMBER PASSES SUDOKU ROW RULE - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function entry_number_passes_row_rule_TEST (number, row, col, expected_output) {
	TestResult.total++
	var cell = [row, col];
	var output;
	var err_triggered = false;

	try {
		output  = entry_number_passes_row_rule(number, cell);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in entry_number_passes_row_rule_TEST: For (' + row + ', ' + col + '), entry number ' + number + ',  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output != expected_output) {
			TestResult.failed++;
			console.log('FAILED in entry_number_passes_row_rule_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
entry_number_passes_row_rule_TEST(5, 8, 2, false); //depends on actual values on screen
entry_number_passes_row_rule_TEST(10, 7, 6, 'Entry number 10 is invalid'); 
entry_number_passes_row_rule_TEST(9, 4, 10, "Cell coordinate: (4, 10) is invalid");

// 6 - FUNCTION TO CHECK IF ENTRY NUMBER PASSES COLUMN SUDOKU RULE - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function entry_number_passes_column_rule_TEST (number, row, col, expected_output) {
	TestResult.total++;
	var cell = [row, col];
	var output;
	var err_triggered = false;

	try {
		output = entry_number_passes_column_rule (number, cell)
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in entry_number_passes_column_rule_TEST: For (' + row + ', ' + col + '), entry number ' + number + ',  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output != expected_output) {
			TestResult.failed++;
			console.log('FAILED in entry_number_passes_column_rule_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
entry_number_passes_column_rule_TEST(4, 8, 3, false); //depends on actual values on screen
entry_number_passes_column_rule_TEST(11, 9, 5, 'Entry number 11 is invalid');
entry_number_passes_column_rule_TEST(6, 7, 10, 'Cell coordinate (7, 10) is invalid');

// FUNCTION TO DETERMINE THE 3X3 BOX THAT A CELL [ROW, COL] BELONGS TO

// Test function definition
// --------------------------------------------------------------
function determine_cell_box_boundaries_TEST (row, col, expected_output) {
	TestResult.total++;
	var cell = [row, col];
	var output;
	var err_triggered = false;

	try {
		output = determine_cell_box_boundaries (cell);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in determine_cell_box_boundaries_TEST: For (' + row + ', ' + col + '),  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output[0] != expected_output[0] && output[1] != expected_output[1] && output[2] != expected_output[2] && output[3] != expected_output[3]) {
			TestResult.failed++;
			console.log('FAILED in determine_cell_box_boundaries_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
output_value = [3, 5, 3, 5];
determine_cell_box_boundaries_TEST(4, 5, output_value);
output_value = [6, 8, 0, 2];
determine_cell_box_boundaries_TEST(6, 2, output_value);
determine_cell_box_boundaries_TEST(9, 2, 'Cell coordinate (9, 2) is invalid');

// 7 - FUNCTION TO CHECK IF ENTRY NUMBER PASSES BOX SUDOKU RULE - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function entry_number_passes_box_rule_TEST (number, row, col, expected_output) {
	TestResult.total++;
	var cell = [row, col];
	var output;
	var err_triggered = false;

	try {
		output = entry_number_passes_box_rule (number, cell);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in entry_number_passes_box_rule_TEST: For (' + row + ', ' + col + '), entry number ' + number + ',  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output != expected_output) {
			TestResult.failed++;
			console.log('FAILED in entry_number_passes_box_rule_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
entry_number_passes_box_rule_TEST (9, 2, 1, false); //depends on actual values on screen
entry_number_passes_box_rule_TEST (10, 2, 1, 'Entry number 10 is invalid');
entry_number_passes_box_rule_TEST (8, 9, 7, 'Cell coordinate (9, 7) is invalid');

// 8 - FUNCTION TO GENERATE A NEW ENTRY NUMBER FOR ANOTHER SOLUTION - TEST FUNCTION

// Test function definition
// --------------------------------------------------------------
function generate_new_entry_number_TEST (number, expected_output) {
	TestResult.total++;
	var output;
	var err_triggered = false;
	try {
		output = generate_new_entry_number(number);
	}
	catch (err) {
		err_triggered = true;
		if (err.message != expected_output) {
			TestResult.failed++;
			console.log('FAILED...ERROR in generate_new_entry_number_TEST: For entry number ' + number + ',  Expected "' + expected_output + '", but got ' + err.message);
		}
	}
	if (err_triggered == false) {
		if (output != expected_output) {
			TestResult.failed++;
			console.log('FAILED in generate_new_entry_number_TEST: Expected ' + expected_output + ', but got ' + output);
		}
	}
}

// Test Cases
// --------------------------------------------------------------
generate_new_entry_number_TEST (4, 5);
generate_new_entry_number_TEST (8, 9);
generate_new_entry_number_TEST (9, 1);
generate_new_entry_number_TEST (11, 'Entry number 11 is invalid');


// Test Log Summary
console.log('Performed ' + TestResult.total + ' tests: ' + TestResult.failed + ' failed');