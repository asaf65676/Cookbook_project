


function print_data(id) {
    //var api1 = ""d126c37ec30f4a7ba1c66d465d0bc783"
    //var api2 = 762ab72f2d674ae8a2950ef195435ced
    var api = "https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false&apiKey=762ab72f2d674ae8a2950ef195435ced";
    //var api = "https://api.spoonacular.com/recipes/" + id + "/information?includeNutrition=false&apiKey=d126c37ec30f4a7ba1c66d465d0bc783";

    fetch(api)
        .then(response => response.json())
        .then(data => {

            document.getElementById("ingredients_of_recipe_container").remove();
            var ingredients_of_recipe_container = document.createElement("div"); //מיכל_מרכיבים_של_מתכון
            ingredients_of_recipe_container.className = "ingredients_of_recipe_container";
            ingredients_of_recipe_container.id = "ingredients_of_recipe_container";
            document.getElementById("ingredients_of_recipe_container_main").appendChild(ingredients_of_recipe_container);

            // תמונה של המתכון
            var img_of_food = document.createElement("img");
            img_of_food.src = data['image'];
            img_of_food.className = "img_of_food";
            ingredients_of_recipe_container.appendChild(img_of_food);

            // header
            var div_header_container = document.createElement("div");
            div_header_container.className = "div_header_container";
            ingredients_of_recipe_container.appendChild(div_header_container);

            //div לזמן
            var container_time = document.createElement("div");
            container_time.className = "container_time";
            div_header_container.appendChild(container_time);

            // הוספת תמונה שעון
            var svgElementClock = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElementClock.innerHTML = `width="16" height="16" fill="currentColor" 
            class="svg_content_clock" viewBox="0 0 16 16">
            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" /><path
                d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />`;
            svgElementClock.classList.add("svg_clock");
            container_time.appendChild(svgElementClock);

            // זמן הכנה של המתכון
            var ready_in_minutes = document.createElement("p");
            ready_in_minutes.innerHTML = data['readyInMinutes'] + " MINUTES";
            ready_in_minutes.className = "ready_in_minutes";
            container_time.appendChild(ready_in_minutes);

            // div לסועדים
            var container_number_diners = document.createElement("div");
            container_number_diners.className = "container_number_diners";
            div_header_container.appendChild(container_number_diners);

            //הוספת תמונה איש
            var svgElementMan = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElementMan.innerHTML = `width="16" height="16" fill="currentColor"
            class="svg_content_man" viewBox="0 0 16 16">
            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" /><path
            d="m5.93 6.704-.846 8.451a.768.768 0 0 0 1.523.203l.81-4.865a.59.59 0 0 1 1.165 0l.81 4.865a.768.768 0 0 0 1.523-.203l-.845-8.451A1.492 1.492 0 0 1 10.5 5.5L13 2.284a.796.796 0 0 0-1.239-.998L9.634 3.84a.72.72 0 0 1-.33.235c-.23.074-.665.176-1.304.176-.64 0-1.074-.102-1.305-.176a.72.72 0 0 1-.329-.235L4.239 1.286a.796.796 0 0 0-1.24.998l2.5 3.216c.317.316.475.758.43 1.204Z" /> `;
            svgElementMan.classList.add("svg_man");
            container_number_diners.appendChild(svgElementMan);

            // כמות סועדים שלהם מספיק המתכון
            var diners = data['servings'];
            var servings = document.createElement("p");
            servings.innerHTML = diners + " SERVINGS";
            servings.className = "servings";
            container_number_diners.appendChild(servings);

            // שתי כפתורים שמאפשרים להוסיף את כמות האנשים שאנו רוצים להכין להם את המנה או להחסיר
            //הוספת סועדים
            var button_add_diners = document.createElement("button");
            button_add_diners.innerHTML = "+";
            button_add_diners.className = "button_add_diners";
            button_add_diners.addEventListener('click', function () {
                diners = add_diners((diners), (data));
                servings.innerHTML = diners + " SERVINGS";
            });
            container_number_diners.appendChild(button_add_diners);

            //מחיקת סועדים
            var button_remove_diners = document.createElement("button");
            button_remove_diners.className = "button_remove_diners";
            button_remove_diners.innerHTML = "&#8722";
            button_remove_diners.addEventListener('click', function () {
                diners = remove_diners((diners), (data));
                servings.innerHTML = diners + " SERVINGS";
            });
            container_number_diners.appendChild(button_remove_diners);

            // div למאכלים המעדפים
            var container_favourite_food = document.createElement("div");
            container_favourite_food.className = "container_favourite_food";
            div_header_container.appendChild(container_favourite_food);

            // כפתור נוסף שמאפשר להוסיף את המתכון למועדפים של הגולש
            var button_add_favorite_to_list = document.createElement("button");
            button_add_favorite_to_list.className = "button_add_favorite_to_list";
            button_add_favorite_to_list.addEventListener('click', function () {

                arr_favorite.push(data);
                localStorage.setItem("arr_favorite", JSON.stringify(arr_favorite));

            })
            container_favourite_food.appendChild(button_add_favorite_to_list);

            // הוספת תמונת לב
            var svgElementHeart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElementHeart.innerHTML = `width="16" height="16" fill="currentColor" 
            class="heart-fill" viewBox="0 0 15 15">
            <path fill-rule="evenodd"
             d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />`;
            svgElementHeart.classList.add("svg_heart");
            button_add_favorite_to_list.appendChild(svgElementHeart);

            //-----------------------------------------------------------------------------------------------------
            // כותרת לרכיבים
            var title_component = document.createElement("div");
            title_component.className = "title_component";
            ingredients_of_recipe_container.appendChild(title_component);

            // כותרת מרכיבים_מתכון
            var recipe_ingredients = document.createElement('h')
            recipe_ingredients.className = recipe_ingredients;
            recipe_ingredients.innerHTML = "RECIPE INGREDIENTS"
            title_component.appendChild(recipe_ingredients)

            // הצגת הרכיבים
            var component_container = document.createElement("div");
            component_container.className = "component_container";
            ingredients_of_recipe_container.appendChild(component_container);

            var right_components = document.createElement("div");
            right_components.className = "right_components";
            component_container.appendChild(right_components);

            var left_components = document.createElement("div");
            left_components.className = "left_components";
            component_container.appendChild(left_components)

            var component_length = data['extendedIngredients'].length;

            for (var i = 0; i < component_length; i++) {

                var components = document.createElement("div");
                components.className = "components";
                components.id = "components_" + i;

                var amount = data['extendedIngredients'][i]['amount'];
                var unit = data['extendedIngredients'][i]['unit'];
                var originalName = data['extendedIngredients'][i]['originalName'];

                components.innerHTML = amount + " " + unit + " " + originalName;
                
                if (i < component_length / 2) {
                    right_components.appendChild(components);
                }
                else {
                    left_components.appendChild(components);
                }
            }
            //---------------------------------------------------------------------------------------------------------------

            // רמת הטעם של המתכון מורכבת ממספר (1 עד 100)
            // var newApi = "https://api.spoonacular.com/recipes/" + id + "/tasteWidget.json?apiKey=d126c37ec30f4a7ba1c66d465d0bc783";
            var newApi = "https://api.spoonacular.com/recipes/" + id + "/tasteWidget.json?apiKey=762ab72f2d674ae8a2950ef195435ced";

            fetch(newApi)
                .then(response => response.json())
                .then(taste => {
                    var taste_level = document.createElement("div");
                    taste_level.className = "taste_level";
                    ingredients_of_recipe_container.appendChild(taste_level);

                    var taste_level1 = document.createElement("div");
                    taste_level1.className = "taste_level1";
                    taste_level1.innerHTML = "sweetness = " + taste['sweetness'] + " "
                        + "bitterness = " + taste['bitterness'] + " "
                        + "fattiness = " + taste['fattiness'];
                    taste_level.appendChild(taste_level1);

                    var taste_level2 = document.createElement("div");
                    taste_level2.className = "taste_level2";
                    taste_level2.innerHTML = "saltiness = " + taste['saltiness'] + " "
                        + "savoriness = " + taste['savoriness'] + " "
                        + "sourness = " + taste['sourness'];
                    taste_level.appendChild(taste_level2);

                    var taste_level3 = document.createElement("div");
                    taste_level3.className = "taste_level3";
                    taste_level3.innerHTML = "spiciness = " + taste['spiciness'] + " "
                        + "sweetness = " + taste['sweetness'];
                    taste_level.appendChild(taste_level3);

                    // ציון הבריאות של המתכון (1-100) 
                    var div_healthScore = document.createElement("div");
                    div_healthScore.className = "div_healthScore";
                    div_healthScore.innerText = "Health Score = " + data['healthScore'];
                    ingredients_of_recipe_container.appendChild(div_healthScore);

                    // כפתור Add to shoping list 
                    var div_add_to_shoping_list = document.createElement("div");
                    div_add_to_shoping_list.className = "div_add_to_shoping_list";
                    ingredients_of_recipe_container.appendChild(div_add_to_shoping_list);

                    var button_shoping_list = document.createElement('button')
                    button_shoping_list.className = "button_shoping_list";
                    button_shoping_list.innerHTML = "ADD TO SHOPING LIST";
                    button_shoping_list.addEventListener('click', function () {

                        shoping_list((data), (diners));
                    })
                    div_add_to_shoping_list.appendChild(button_shoping_list);

                    // כותרת לקישור
                    var div_title_directions = document.createElement("div");
                    div_title_directions.className = "div_title_directions";
                    ingredients_of_recipe_container.appendChild(div_title_directions);

                    var title_directions = document.createElement("h2");
                    title_directions.className = "title_directions";
                    title_directions.innerHTML = "HOW TO COOK IT";
                    div_title_directions.appendChild(title_directions);

                    // טקסט לקישור
                    var div_text_directions = document.createElement("div");
                    div_text_directions.className = "div_text_directions";
                    ingredients_of_recipe_container.appendChild(div_text_directions);

                    var text_directions = document.createElement("h3");
                    text_directions.className = "text_directions";
                    text_directions.innerHTML = "This recipe was carefuly designed and tested by Two Peas and Their Pod. Please check out directions at their website.";
                    div_text_directions.appendChild(text_directions);

                    // הקישור
                    var div_directions = document.createElement("div");
                    div_directions.className = "div_directions";
                    ingredients_of_recipe_container.appendChild(div_directions);

                    var button_directions = document.createElement('button')
                    button_directions.className = "button_directions";
                    button_directions.innerHTML = "Directions ";
                    button_directions.addEventListener('click', function () {
                        window.open(data['spoonacularSourceUrl'], '_blank');
                    })
                    div_directions.appendChild(button_directions);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}