# Firebase Transaction Unexpected Rollback
This repository demonstrates a subtle bug in Firebase's transaction functionality. Even when exceptions are caught within the transaction's update function, the transaction may still be unexpectedly rolled back. This is not well-documented behavior and can lead to debugging challenges.

The `firebaseBug.js` file contains code showcasing the issue.  The `firebaseBugSolution.js` offers a potential workaround.

## Reproduction
1. Clone this repository.
2. Set up a Firebase project and install the Firebase JavaScript SDK.
3. Configure your Firebase credentials.
4. Run the `firebaseBug.js` file. You'll likely observe that the transaction is aborted despite the `try...catch` block within the transaction.

## Workaround (firebaseBugSolution.js)
While a complete solution requires a deeper understanding of Firebase's internal transaction handling, a workaround might involve explicitly checking for error conditions and returning the original data if an error occurs.