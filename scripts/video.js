console.log('video script added')


function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`;
}

const removeActiveClass=()=> {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove("active")
    }
    // console.log('html collection')
}

//1 - Fetch, Load and show categories on html
// create loadCatagories
const loadCatagories = () => {
     //fetch the data
     fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
     .then ((res) => res.json())
     .then((data) => displayCategories(data.categories))
     .catch((error) => console.log(error))
};
const loadVideos = () => {
     //fetch the data
     fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
     .then ((res) => res.json())
     .then((data) => displayVideos(data.videos))
     .catch((error) => console.log(error))
};

const loadCategoryVideos = (id) => {
    // alert(id);
    //fetch the data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then ((res) => res.json())
    .then((data) => {
        //sobaike active class remove koro
        removeActiveClass()

        //id er class k active korao
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active")
        console.log(activeBtn);
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

// const cardDeme ={
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML=`
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png" />
        <h2 class="text-center text-xl font-bold"> 
        No Content here in this category
        </h2>
        </div>

        `;
        return;
    } else{
        videoContainer.classList.add("grid");
    }
   

    videos.forEach(video => {
        console.log(video);
        const card = document.createElement('div');
        card.classList= "card card-compact";
        card.innerHTML=`
        <figure class = "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 text-white bg-black rounded p-1">${getTimeString(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
            <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}"/>
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center>
         <p class="text-gray-400">${video.authors[0].profile_name} </p>
         
            ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ""}

        </div>
       
        <p> </p>
        </div>

    </div>
    
    `;
    videoContainer.append(card);
    })
}
// {
//     "category_id": "1001",
//     "category": "Music"
// }
//create DisplayCategories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    
    categories.forEach((item) => {
        console.log(item);
        //create a button

        // const button = document.createElement('button');
        // button.classList = "btn";
        // button.innerText = item.category;

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = 
        `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        

        //add button to category container
        categoryContainer.append(buttonContainer);
    });
    
};

loadCatagories();
loadVideos();
