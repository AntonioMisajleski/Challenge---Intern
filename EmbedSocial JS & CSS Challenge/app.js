let images = [];
let loaded = 0;
let total = 0;
const container = document.getElementById("container");
fetch("data.json", {
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((res) => {
        images = res;
        total = images.length;

        loadMore();
        
    });

const appendImages = (images) => {
    images.forEach((image) => {
        const box = document.createElement("div");
        box.className = "box";
        box.innerHTML = `
        <section class="author"> 
            <div class ="profile">
            <img src= " ${image.profile_image}">
            
            &nbsp &nbsp
            <div class="prv">
            ${image.name},<br> ${image.date.slice(0, 10)}</div>
            </div>
            <div>
                <img src="${image.source_type === "facebook"
                        ? "./icons/facebook.svg"
                        : "./icons/instagram-logo.svg" }">
            </div>
        </section>
        
        <div class="image" style="background-image:url('${image.image}')"></div>
        <section class="caption">${image.caption}</section>
        <hr>
        <div class="likes"> <img src="./icons/heart.svg"> &nbsp ${image.likes}</div>    
         `;
        container.appendChild(box);
    });
};
function loadMore() {
    let next = 4;

    if (loaded + 4 > total) next = total - loaded;
    appendImages(images.slice(loaded, loaded + next));
    loaded += next;
    if (loaded == total) document.getElementById("load").hidden = true;
}
