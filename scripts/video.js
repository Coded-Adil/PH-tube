console.log('done')
// fetch load catagories and show them
const loadCategories = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
      .catch((error) => console.log(error))
  };
const loadVideos = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((res) => res.json())
      .then((data) => displayVideos(data.videos))
      .catch((error) => console.log(error))
  };

const loadCategoryVideos = (id) => {
  // alert(id);
  // fetch
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active");
        displayVideos(data.category)
      })
      .catch((error) => console.log(error))
}

  
  const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
  
    categories.forEach((item) => {
      console.log(item);
      //create a button
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
         ${item.category}
        </button>
      `;
  
      //add button to category container
      categoryContainer.append(buttonContainer);
    });
  };

//   const demoObj = {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  const min = parseInt(remainingSec / 60);
  remainingSec = remainingSec % 60;

  return `${hour} hrs ${min} min ${remainingSec} sec ago`;
}

const removeActiveClass = () =>{
  const buttons = document.getElementsByClassName("category-btn");

  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

  const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML="";

    if (videos.length == 0) {
      videoContainer.classList.remove('grid');
      videoContainer.innerHTML=`
      <div class="min-h-[400px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="img/icon.png"/>
        <h6 class="font-bold text-5xl text-center">Oops! Sorry, There is no <br>content here</h6>
      </div>
      `;
      return;
    }
    else{
      videoContainer.classList.add('grid');
    }

    videos.forEach( (video) => {
      console.log(video);
      const card = document.createElement('div');
      card.classList = "card card-compact";
      card.innerHTML = 
      `
      <figure class="h-[200px] relative">
        <img
          src=${video.thumbnail}
          class="h-full w-full object-cover"
          alt="Shoes" />
        ${video.others.posted_date.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-gray-700 rounded p-1 text-white text-xs">
          ${getTime(video.others.posted_date)}
        </span>`}
        
      </figure>
      <div class="px-0 py-2 flex gap-4">
        <div>
          <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
        </div>
        <div>
          <h2 class="font-bold">${video.title}</h2>
          <div class="flex item-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name}</p>
            
            ${video.authors[0].verified === true ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 bg-blue-500 rounded-full text-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>` : ""}

          </div>
          <p></p>
        </div>
      </div>
      `;

      videoContainer.append(card);
    })
  }
  

  loadCategories()
  loadVideos()