const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const ID = btn.id.split('_')[1];
        
        const loan = {
          ID: ID,
          userEmail: document.getElementById(`userEmail_${ID}`).innerText,
          bookID: document.getElementById(`bookID_${ID}`).innerText,
          issueDate: document.getElementById(`issueDate_${ID}`).value,
          dueDate: document.getElementById(`dueDate_${ID}`).value,
          returnDate: document.getElementById(`returnDate_${ID}`).value,
          status: document.getElementById(`status_${ID}`).value
        }
        console.log(loan);
        $.ajax({
            url: 'borrow/edit',
            type: 'post',
            data: loan,  // edited items
            dataType:'json',
            success: (response) => {
                console.log('Saved successfully');
            }
        });
      })
    })
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const ID = btn.id.split('_')[1];
        $.ajax({
            url: `borrow/${ID}`,
            type: 'delete',
            data: ID,  // edited items
            dataType:'json',
            success: (response) => {
                console.log('Deleted successfully');
            }
        }).done(
          $(`#${btn.id}`).parents("tr").remove()
        )
      })
    })