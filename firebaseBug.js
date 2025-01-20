The following code snippet demonstrates an uncommon error in Firebase where a transaction is unexpectedly rolled back despite seemingly meeting all the criteria for success.  This can occur when the transaction's update function throws an exception, even if it's caught within the transaction itself.
```javascript
firebase.database().ref('myData').transaction(function(currentData) {
  if (currentData === null) {
    return {
      value: 1 // Initialize the value if it doesn't exist.
    };
  }

  try {
    // Simulate an error that might occur during update.
    const newValue = currentData.value + 1;
    if (newValue > 5) {
        throw new Error('Value exceeded limit');
    }
    return { value: newValue };
  } catch (error) {
    console.error('Error during transaction:', error); // This will log the error
    return; // This should prevent roll-back according to documentation
  }
}).then(function(result) {
  if (result.committed) {
    console.log('Transaction committed successfully:', result.snapshot.val());
  } else {
    console.log('Transaction aborted:', result.error); // This will still log transaction was aborted even if error is handled
  }
}).catch(function(error) {
  console.error('Transaction failed:', error); //This won't catch the error, the transaction will be aborted
});
```