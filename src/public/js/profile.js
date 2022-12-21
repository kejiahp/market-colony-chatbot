const submitButton = document.querySelector('#submitFacebookProfile')

submitButton.addEventListener("click",(e)=>{
    e.preventDefault()

    const uri = `${window.location.origin}/profile/setup-profile`

    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        if(res.message === 'ok') {
            alert("Profile as been set up")
        } else(
            alert("Profile couldnt be set up")
        )
    })
    .catch(err => {
        console.log(err)
        alert("An error occured while setting up profile")
    })
})