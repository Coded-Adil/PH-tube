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

  const demoObj = {
    "category_id": "1003",
    "video_id": "aaak",
    "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
    "title": "Beyond The Pale",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
            "profile_name": "Jim Gaffigan",
            "verified": false
        }
    ],
    "others": {
        "views": "2.6K",
        "posted_date": "15400"
    },
    "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
}

  const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');

    videos.forEach( (video) => {
      console.log(video);
      const card = document.createElement('div');
      card.classList = "card card-compact";
      card.innerHTML = 
      `
      <figure>
        <img
          src=${video.thumbnail}
          alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
      `;

      videoContainer.append(card);
    })
  }
  

  loadCategories()
  loadVideos()