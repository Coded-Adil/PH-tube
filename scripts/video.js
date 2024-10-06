console.log('done')
// fetch load catagories and show them
const loadCategories = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
      .then((res) => res.json())
      .then((data) => displayCategories(data.categories))
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
  

  loadCategories()