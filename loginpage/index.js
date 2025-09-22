function signup()
{
    window.location.href = "../signuppage/index.html";
}
function changepage()
{
    window.location.href = "../maintodopage/index.html";
}
function error()
{
   setInterval(function()
      {
        const error = document.createElement("div");
        error.setAttribute("id" , "error");
        error.innerHTML = "Error Occured !";
        document.body.appendChild(error);
      } , 7000);
      document.body.removeChild(error);
      return; 
}
async function sendData(valuee ,valuep) {
  try {
    const response = await fetch("http://localhost:3000/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
       password : valuep, 
       email : valuee
      }),
    });

    if (!response.ok) {
      error();
    }
    else
    {
      const data = await response.json();
      localStorage.setItem("token",data.token);
      changepage();
    }

  } catch (error) {
    error();
  }
}
function signin()
{
    let email = document.getElementById("emailinput");
    let valuee = email.value;
    let pass = document.getElementById("passwordinput");
    let valuep = pass.value;
    sendData(valuee ,valuep);
}