function logout()
{
  localStorage.clear();
  window.location.href = "../homepage/index.html";
}
async function deletetodo(button)
{
  console.log("hi");
  let token = localStorage.getItem("token");
  let id = button.closest(".maindata").querySelector(".id").innerHTML;
  try {
    const response = await fetch("http://localhost:3000/User/deletetodo", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        "token": token, 
      },
      body: JSON.stringify({
        Todoid : id
      }),
    });

    if (!response.ok) {
      location.reload();
    }
    else
    {
      location.reload();
    }

  } catch (error) {
    location.reload();
  }
}
function profilego()
{
   window.location.href = "../profilepage/index.html";
}
async function doneit(button)
{
  let token = localStorage.getItem("token");
   let id = button.closest(".maindata").querySelector(".id").innerHTML;
   console.log(id);
    try {
    const response = await fetch("http://localhost:3000/User/todo/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token, 
      },
      body: JSON.stringify({
        Todoid : id
      }),
    });

    if (!response.ok) {
      location.reload();
    }
    else
    {
      location.reload();
    }

  } catch (error) {
    location.reload();
  }
}
function helprender(todoobj)
{
  console.log(todoobj);
  const maindata = document.createElement("div");
      maindata.setAttribute("class" , "maindata");
      const taskparent = document.getElementById("taskparent");
      taskparent.appendChild(maindata);
      const rowdata = document.createElement("div");
      rowdata.setAttribute("class" , "rowdata");
      maindata.appendChild(rowdata);
      const titledata = document.createElement("div");
      titledata.setAttribute("class" , "titledata");
      titledata.innerHTML = todoobj.Title;
      rowdata.appendChild(titledata);
      const prioritydata = document.createElement("div");
      prioritydata.setAttribute("class" , "prioritydata");
      rowdata.appendChild(prioritydata);
      const priorityd = document.createElement("button");
      priorityd.setAttribute("class" , "priorityd");
      priorityd.innerHTML = todoobj.Priority;
      prioritydata.appendChild(priorityd);
      const donebtn = document.createElement("div");
      donebtn.setAttribute("class" , "donebtn");
      rowdata.appendChild(donebtn);
      const didit1 = document.createElement("button");
      didit1.setAttribute("type", "button");
      didit1.setAttribute("class" , "didit");
      didit1.innerHTML = "Done";
      didit1.addEventListener("click", function() {
      doneit(this);
      });
      donebtn.appendChild(didit1);
      const deletetodo1 = document.createElement("div");
      deletetodo1.setAttribute("class" , "deletetodo");
      rowdata.appendChild(deletetodo1);
      const deleteit = document.createElement("button");
      deleteit.setAttribute("type", "button");
      deleteit.setAttribute("class" , "delete");
      deleteit.addEventListener("click", function() {
      deletetodo(this);
      });
      deletetodo1.appendChild(deleteit);
      const bin = document.createElement("img");
      bin.setAttribute("class" , "bin");
      bin.setAttribute("src" , "../bin.png");
      bin.setAttribute("alt" , "");
      deleteit.appendChild(bin);
      const dateandimage = document.createElement("div");
      dateandimage.setAttribute("class" , "dateandimage");
      maindata.appendChild(dateandimage);
      const image = document.createElement("div");
      image.setAttribute("class" , "image");
      dateandimage.appendChild(image);
      const imgdate = document.createElement("img");
      imgdate.setAttribute("class" , "imgdate");
      imgdate.setAttribute("src" , "../date.png");
      imgdate.setAttribute("alt" , "");
      image.appendChild(imgdate);
      const date = document.createElement("div");
      date.setAttribute("class" , "date");
      date.innerHTML = todoobj.Date;
      dateandimage.appendChild(date);
      const id = document.createElement("div");
      id.setAttribute("class" , "id");
      id.innerHTML = todoobj._id;
      maindata.appendChild(id);
} 
function renderit(response)
{
  for(let i=0 ; i<response.length ; i++)
  {
      if(!response[i].Status)
      {
        helprender(response[i]);
      }
  }
}
async function settodo()
{
    let token = localStorage.getItem("token");
    let title = document.getElementById("taskinput").value;
    let date = document.getElementById("calender").value;
    let priority = "High";
    let status = false;
  try {
    const response = await fetch("http://localhost:3000/User/settodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token, 
      },
      body: JSON.stringify({
        title: title,
        date : date,
        priority : priority, 
        status : status
      }),
    });

    if (!response.ok) {
      location.reload();
    }
    else
    {
      location.reload();
    }

  } catch (error) {
    location.reload();
  }
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
  const totaltasks = document.getElementsByClassName("totaltasknumber");
  totaltasks[0].innerHTML = response.msg.length;
  const numberoftasksfound = document.getElementById("numberoftasksfound");
  const response1 = completedtasks(response.msg);
  numberoftasksfound.innerHTML = response.msg.length - response1;
  const completedtask = document.getElementsByClassName("totalcompletedtasknumber");
  completedtask[0].innerHTML = response1;
  let percent = Math.trunc(Number(0));
  let total = Math.trunc(Number(response.msg.length));
  if(total != 0)
  {
    percent = Math.trunc(Number((Number(response1)/Number(total))*Number(100)));
  } 
  const totalpercent = document.getElementsByClassName("num");
  totalpercent[0].innerHTML = String(percent);
  renderit(response.msg)
};