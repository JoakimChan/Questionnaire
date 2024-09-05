# Questionnaire

This project is a console-based personality quiz that matches users with an animal based on their answers to a series of questions. The results are stored in a JSON file and can be reviewed later.

## Features

- **Run the Quiz**: Users can take the quiz to find out which animal they are most similar to based on their answers.
- **View Results**: Users can view the results of previous quizzes.
- **Save and Load Data**: The results are saved in a JSON file and can be loaded each time the application runs.

## Setup

### Prerequisites

- Node.js: Ensure that you have Node.js installed on your machine.

### Installation

**Install Dependencies**

   Run the following command to install the required Node.js modules:

   ```
   npm install
   ```

### Usage

1. **Run the Program**

   Start the application by running:

   ```
   node index.js
   ```

2. **Menu Options**

   - **1**: Run the form to take the quiz.
   - **2**: Show all previous results.
   - **q**: Exit the program and save the results.

3. **Taking the Quiz**

   - Follow the prompts to answer each question.
   - You can choose `y` for Yes, `n` for No, and `q` to stop the form early.

4. **Viewing Results**

   - Option 2 in the menu displays all saved results, showing scores and timestamps.

### Files

- **questions.json**: Contains the quiz questions and corresponding point values for each answer.
- **result.json**: Stores the results of all quizzes, including timestamps and scores for each user.

### Code Explanation

- **Dependencies**: Uses `prompt-sync` for input handling and `fs` for file operations.
- **Main Loop**: Provides a menu for the user to either run the quiz, view results, or exit.
- **Quiz Function**: Handles the quiz process, including collecting user responses and calculating scores.
- **Result Handling**: Updates and displays results, saving them to a JSON file.
- **Error Handling**: Manages invalid inputs and file operations.