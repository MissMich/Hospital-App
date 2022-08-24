const registrationForm = document.getElementById('register')

registrationForm.addEventListener('submit', (reg) => {
    reg.preventDefault();

    const doctorData = {
        DoctorsName: registrationForm.DoctorsName.value,
        Email: registrationForm.Email.value,
        Specialization: registrationForm.Specialization.value,
        Gender: registrationForm.Gender.value,
        Phone: registrationForm.Phone.value,
        Password: registrationForm.Password.value,
        Confirm_password: registrationForm.Confirm_password.value
        
    }
    
    fetch('/index/register', {
        method: 'POST',
        body: JSON.stringify(doctorData),
        headers: {'Content-Type': 'application/json'}
    })
    .then((response)=>{
        if(response.ok){
            alert("Registration was successful")
            window.location.assign("/login")
            return response.json()
        }else{
            console.log(response)
            alert('Registration failed')
        }
    })
    .catch((error)=>{
        console.log(error)
    })
})