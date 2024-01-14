function list_foods() {
    //var api1 = ""d126c37ec30f4a7ba1c66d465d0bc783"
    //var api2 = 762ab72f2d674ae8a2950ef195435ced
    //var api = "https://api.spoonacular.com/recipes/complexSearch?apiKey=d126c37ec30f4a7ba1c66d465d0bc783&query=" + document.getElementById("search_box").value;
    var api = "https://api.spoonacular.com/recipes/complexSearch?apiKey=762ab72f2d674ae8a2950ef195435ced&query=" + document.getElementById("search_box").value;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            var result = data['results'];

            document.getElementById("results").remove();

            var results = document.createElement('div');
            results.className = 'results';
            results.id = 'results';
            document.getElementById('results_main').appendChild(results);
            
            // בדיקה שהמשתמש הניס קלט תקין
            if (result.length == 0) {

                var error = document.createElement("h2");
                error.className = "error";
                error.innerHTML = "No results"
                results.appendChild(error);
            }

            for (let i = 0; i < result.length; i++) {

                //יצירת תגית כללית למאכל
                var button_element_food = document.createElement("button");
                button_element_food.className = "button_element_food";
                button_element_food.addEventListener('click', function () {
                    print_data((result[i].id));
                });
                results.appendChild(button_element_food);

                // יצירת תגית תמונה
                var food_picture = document.createElement("img");
                food_picture.src = result[i].image;
                food_picture.className = "food_picture";
                button_element_food.appendChild(food_picture);

                //יצירת תגית כללית לתיאור
                var div_title_of_food = document.createElement("div");
                div_title_of_food.className = "div_title_of_food";
                button_element_food.appendChild(div_title_of_food);

                // יצירת תגית כותרת
                var title_of_food = document.createElement("h4");
                title_of_food.className = "title_of_food";
                title_of_food.innerHTML = result[i].title;
                div_title_of_food.appendChild(title_of_food);

                // יצירת תגית תיאור
                var description_of_food = document.createElement("h5");
                description_of_food.className = "description_of_food";
                description_of_food.innerHTML = result[i].title;
                div_title_of_food.appendChild(description_of_food);


            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}