A complete fix requires a deeper investigation into Firebase's internal transaction mechanisms. However, a workaround to mitigate this unexpected behavior involves implementing more robust error handling and explicitly checking the transaction result:
```javascript
firebase.database().ref('myData').transaction(function(currentData) {
  if (currentData === null) {
    return { value: 1 };
  }
  try {
    const newValue = currentData.value + 1;
    if (newValue > 5) {
      throw new Error('Value exceeded limit');
    }
    return { value: newValue };
  } catch (error) {
    console.error('Error during transaction:', error);
    // Explicitly return the current data to prevent rollback
    return currentData;
  }
}).then(function(result) {
  if (result.committed) {
    console.log('Transaction committed:', result.snapshot.val());
  } else {
    console.log('Transaction aborted:', result.error);
    // Handle the specific error here for more robust logic
    if(result.error.message === 'Value exceeded limit'){
        //Implement custom code for this error
    }
  }
}).catch(function(error) {
  console.error('Transaction failed:', error);
});
```
This improved solution explicitly returns `currentData` within the `catch` block. This ensures that the transaction isn't rolled back due to the exception, but instead the previous value remains.  Also added is a check for error messages to perform better error handling.