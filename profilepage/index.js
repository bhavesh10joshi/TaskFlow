function goback()
{
    window.location.href = "../maintodopage/index.html";
}
function completedtasks(arr)
{
  let count = 0;
  for(let i=0 ; i<arr.length ; i++)
  {
    if(arr[i].Status)
    {
      count++;
    }
  }
  return count;
}
async function render(token)
{

    try {
    const response = await fetch("http://localhost:3000/User/details", {
      method: "GET",
      headers: {
        "token": token, 
      }
    });

    if (!response.ok) {
      window.location.href = "../maintodopage/index.html";
    }
    else
    {
      const userobj = await response.json();
      console.log(userobj)
      const name1 = document.getElementById("nameuserprofile");
      name1.innerHTML = String(userobj.msg.Firstname) +" "+ String(userobj.msg.Lastname);
      const email1 =document.getElementById("emailuserprofile");
      email1.innerHTML = userobj.msg.Email;
      const email2 =document.getElementById("fullemailshow");
      email2.innerHTML = userobj.msg.Email;
      const name2 = document.getElementById("fullnameshow");
      name2.innerHTML = String(userobj.msg.Firstname) +" "+ String(userobj.msg.Lastname);
    }

  } catch (error) {
     window.location.href = "../maintodopage/index.html";
  }
}
window.onload = async function() {
  let token = localStorage.getItem("token");
  let response=[];
  try {
    const arrlen = await fetch("http://localhost:3000/User/gettodo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": token, 
      }
    });

    if (!arrlen.ok) {
      response = [];
    }
    else
    {
     response = await arrlen.json();
    }

  } catch (error) {
    response = [];
  }

  const totaltasks = document.getElementById("totaltasksnumber")
  totaltasks.innerHTML = response.msg.length;
  let response1 = 0;
  for(let i=0 ; i<response.msg.length ; i++)
  {
    if(response.msg[i].Status)
    {
      response1++;
    }
  }
  const completedtasks = document.getElementById("taskscompletednumber");
  completedtasks.innerHTML = response1;
  let percent = Math.trunc(Number(0));
  let total = Math.trunc(Number(response.msg.length));
  if(total != 0)
  {
    percent = Math.trunc(Number((Number(response1)/Number(total))*Number(100)));
  } 
  const totalpercent = document.getElementById("realpercentageno");
  totalpercent.innerHTML = String(percent); 
  render(token);
};