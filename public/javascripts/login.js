const login = document.getElementById("login")

login.addEventListener("submit", (loginVal)=>{
    loginVal.preventDefault();
    loginVal.stopPropagation();

    const preLoad = new FormData(login);
    const payLoad = new URLSearchParams(preLoad)

    fetch('/index/login', {
        method:"POST",
        body: payLoad
    })
    .then((response)=>{
        if(response.ok){
            console.log(response)
            alert("Login successful")
            window.location.assign('/dashboard')
            return response.json()
        }else{
            alert('Login Failed')
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})