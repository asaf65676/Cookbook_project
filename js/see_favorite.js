var favorite_container_open = false;

function open_close_favorite_container() {
  favorite_container_open = !favorite_container_open;

  if (favorite_container_open) {
    print_favorite(arr_favorite);
  } else {
    document.getElementById('favorite_food_container').innerHTML = "";
  }
}

function print_favorite(arr_favorite) {

  for (let i = 0; i < arr_favorite.length; i++) {

    //יצירת תגית כללית למאכל
    var favorite_food = document.createElement("div");
    favorite_food.className = "favorite_food";
    document.getElementById('favorite_food_container').appendChild(favorite_food);

    // יצירת כפתור 
    var button_element_food = document.createElement("button");
    button_element_food.className = "button_element_food";
    button_element_food.addEventListener('click', function (event) {

      shoping_list((arr_favorite[i]), (arr_favorite[i].servings));
      print_data((arr_favorite[i].id))
    });
    favorite_food.appendChild(button_element_food);

    // יצירת תגית תמונה
    var food_picture = document.createElement("img");
    food_picture.src = arr_favorite[i].image;
    food_picture.className = "food_picture";
    button_element_food.appendChild(food_picture);

    //יצירת תגית כללית לתיאור
    var div_title_of_food = document.createElement("div");
    div_title_of_food.className = "div_title_of_food";
    button_element_food.appendChild(div_title_of_food);

    // יצירת תגית כותרת
    var title_of_food = document.createElement("h4");
    title_of_food.className = "title_of_food";
    title_of_food.innerHTML = arr_favorite[i].title;
    div_title_of_food.appendChild(title_of_food);

    // יצירת תגית תיאור
    var description_of_food = document.createElement("h5");
    description_of_food.className = "description_of_food";
    description_of_food.innerHTML = arr_favorite[i].title;
    div_title_of_food.appendChild(description_of_food);

    // כפתור למחיקת מועדפים מ localStorage
    var button_delete_favorite = document.createElement("button");
    button_delete_favorite.className = "button_delete_favorite";
    button_delete_favorite.innerHTML = "x"
    button_delete_favorite.addEventListener('click', function (event) {

      event.stopPropagation(); 
      delete_member((i));
    });
    button_element_food.appendChild(button_delete_favorite);
  }
}

// פונקציה למחיקת אברים מ localStorage
function delete_member(i) {
  if (i >= 0 && i < arr_favorite.length) {

    arr_favorite.splice(i, 1);
    localStorage.setItem('arr_favorite', JSON.stringify(arr_favorite));
  }
}
