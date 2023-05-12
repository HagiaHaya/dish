# DishChooser

The DishChooser is a simple form-based application that allows users to choose a dish and enter relevant information. It provides validation for the form fields based on the selected dish type.

## Prerequisites

- Node.js (v14 or above)
- npm (v6 or above)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:

   ```bash
    cd dish-chooser
    ```
3. Install dependencies:
    ```bash
   npm install
   ```
## Usage
1. Start the application:
    ```bash
   npm start
   ```
2. Open the application in a browser at http://localhost:3000
3. Fill in the form fields as follows:

   - Dish Name: Enter the name of the dish.
   - Preparation Time: Select the preparation time for the dish.
   - Dish Type: Choose the type of dish from the dropdown menu.
   - Additional fields will appear based on the selected dish type. Fill in the relevant information for the chosen dish.

4. Click the Submit button to submit the form. The form will be validated and an alert will be displayed if there are any errors.