document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(async response => {
            if (response.ok) return response.json();
            const errorData = await response.text();
            throw new Error(errorData);
        })
        .then(data => {
            const successMsg = document.getElementById('responseMessage')
            successMsg.innerText = "Created Successfully: " + data.username;
            successMsg.style.color = 'green';

            setTimeout(() => {
                window.location.href = "/home-page";
            },1500)
        })
        .catch(error => {
            const errMsg = document.getElementById('responseMessage');
            errMsg.innerHTML =
            `<img src="/icons/error-cross-icon.png" width="20" height="20" alt="error">
            <span>${error.message}</span>`;
            errMsg.style.display = 'flex';
        });
});