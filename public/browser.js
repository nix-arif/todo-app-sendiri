document.addEventListener('click', function(e) {

    // Update Feature
    if (e.target.classList.contains('edit-me')) {
        console.log('Tekan edit')
        let userInput = prompt("Enter your new text here", e.target.parentElement.parentElement.querySelector('.text-item').innerHTML)
        if (userInput) {
            axios.post('/update-item', {text: userInput, id: e.target.getAttribute('data-id')}).then(function() {
                e.target.parentElement.parentElement.querySelector('.text-item').innerHTML = userInput
            }).catch(function() {
                console.log("Please try again later")
            })
        }
    }

    // Delete Feature
    if (e.target.classList.contains('delete-me')) {
        console.log('Dah tekan delete')
        if (confirm('This data will be permanently delete')) {
            axios.post('/delete-item', {id: e.target.getAttribute('data-id')}).then(function() {
                e.target.parentElement.parentElement.remove()
            }).catch(function() {
                console.log("Pleasa try again later")
            })
        }
    }
})