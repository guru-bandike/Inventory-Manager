// Conform delete product request
function deleteProduct(id) {
  const isConfirmed = confirm('Are you sure about deleting this product ?');

  // If Conformed, Post a delete product request
  if (isConfirmed) {
    fetch(`/delete-product/${id}`, { method: 'POST' })
    .then((res) => {
      if (res.ok) {
        // Reload the page if the product has beed succesfully deleted
        location.reload();
      }
    })
    .catch(err)
    {
      // Handle errors from fetch operation, if any
      res.send(err);
    };
  } else {
    // Show an alert if unable to delete the product
    alert('Unable to delete the product!')
  }
}
