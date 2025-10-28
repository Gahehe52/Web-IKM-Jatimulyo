//ikm.js
const ikmData = [
  {
    id: 1,
    name: "Keripik Pisang Jatimulyo",
    desc: "Keripik pisang renyah khas Desa Jatimulyo, dibuat dari bahan alami tanpa pengawet.",
    img: "assets/images/ikm1.jpg",
    link: "https://gofood.link/keripik-pisang"
  },
  {
    id: 2,
    name: "Kopi Luwak Jatimulyo",
    desc: "Nikmati cita rasa kopi pegunungan dengan aroma khas dan rasa lembut.",
    img: "assets/images/ikm2.jpg",
    link: "https://grabfood.link/kopi-luwak"
  },
  {
    id: 3,
    name: "Batik Tulis Jatimulyo",
    desc: "Batik tulis khas Jatimulyo dengan motif alam dan pewarna alami.",
    img: "assets/images/ikm3.jpg",
    link: "https://tokopedia.link/batik-jatimulyo"
  }
];

// Render daftar IKM
if (document.getElementById("ikm-list")) {
  const list = document.getElementById("ikm-list");
  ikmData.forEach(ikm => {
    const card = document.createElement("div");
    card.className = "ikm-card fade-in";
    card.innerHTML = `
      <img src="${ikm.img}" alt="${ikm.name}">
      <h3>${ikm.name}</h3>
      <p>${ikm.desc}</p>
    `;
    card.onclick = () => {
      window.location.href = `ikm-detail.html?id=${ikm.id}`;
    };
    list.appendChild(card);
  });
}

// Render detail IKM
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (id) {
  const ikm = ikmData.find(i => i.id == id);
  if (ikm) {
    document.getElementById("ikm-img").src = ikm.img;
    document.getElementById("ikm-name").innerText = ikm.name;
    document.getElementById("ikm-desc").innerText = ikm.desc;
    document.getElementById("ikm-link").href = ikm.link;
  }
}
