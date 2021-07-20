const Externaldiv = document.querySelector(".content");

const fetchitems = async () => {
  const res = await fetch("http://localhost:3001/data");
  const data = await res.json();
  return data;
};

const fetchBackend = async () => {
  const content = await fetchitems();

  content.map((item) => {
    const div = document.createElement("div");
    div.className = "container";
    div.innerHTML = `
         <h1>${item.title}</h1>
         <h2>${item.tags}</h2>
         <h5>${item.date}</h5>
         <h5>Completed : ${item.completed} </h5>
      `;
    Externaldiv.append(div);
  });
};

fetchBackend();
