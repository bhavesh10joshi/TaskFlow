function signin()
{
    window.location.href = "../loginpage/index.html";
}
function signup()
{
    let email = document.getElementById("emailinput");
    let valuee = email.value;
    let pass = document.getElementById("passwordinput");
    let valuep = pass.value;
    let fn = document.getElementById("firstnameinput");
    let valuefn = fn.value;
    let ln = document.getElementById("lastnameinput");
    let valueln = ln.value;
    sendData(valuee ,valuep , valuefn , valueln);
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
async function sendData(valuee ,valuep , valuefn , valueln) {
  try {
    const response = await fetch("http://localhost:3000/User/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        firstname: valuefn,
       lastname: valueln,
       password : valuep, 
       email : valuee
      }),
    });

    if (!response.ok) {
      error();
    }
    else
    {
       signin();
    }

  } catch (error) {
    error();
  }
}

