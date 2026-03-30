document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const userVal = document.getElementById('username').value;
    const passVal = document.getElementById('password').value;

    const loginData = {
        username: userVal,
        password: passVal
    };

    fetch('/users/log-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(async response => {
            if (response.ok) {
                return response.text();
            } else {
                const errData = await response.text()
                throw new Error(errData)
            }
        })
        .then(data => {
            const successMsg = document.getElementById('responseMessage');
            successMsg.innerText = "Logged in successfully...";
            successMsg.style.color = 'green';
            successMsg.style.display = 'block';

            setTimeout(() => {
                window.location.href = "/home-page";
            }, 1500);
        })
        .catch(error => {
            const errMsg = document.getElementById('responseMessage');
            errMsg.innerHTML =
                `<img src="/icons/error-cross-icon.png" width="20" height="20" alt="error">
            <span>${error.message}</span>`;
            errMsg.style.display = 'flex';
            errMsg.style.color = 'red';
        });
});