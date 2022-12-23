const submitButton = document.querySelector('#submitFacebookProfile')

function redirectFunc() {
    window.location.assign("http://m.me/RestaurantChatbotTesting")
}

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
        if(res.message === 'ok') {
            alert("Profile as been set up")
            setTimeout("redirectFunc()", 2000);
        } else(
            alert("Profile couldnt be set up")
        )
    })
    .catch(err => {
        console.log(err)
        alert("An error occured while setting up profile")
    })
})