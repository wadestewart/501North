const submit = document.getElementById('submit')
const editSubmit = document.getElementById('submit-edit')
const deleteButton = document.getElementById('delete')

// Stores which item to edit/delete when the edit modal is up
let currentlyEditing = ''

function editModal (comment) {
    // Sets the edit modal to have the data from the gif clicked on
    $('#modal-edit').modal('open')
    const commentEdit = document.getElementById('comment-edit')
  
    commentEdit.value = comment.name
    currentlyEditing = comment._id
  }


$('.modal').modal()
