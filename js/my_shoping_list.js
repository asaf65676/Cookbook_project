function shoping_list(data, diners) {

    if(document.getElementById('title_my_shopping_list') == null){
    var title_my_shopping_list = document.createElement("h1");
    title_my_shopping_list.className = "title_my_shopping_list";
    title_my_shopping_list.id = "title_my_shopping_list";
    title_my_shopping_list.innerHTML = "My shopping List";
    document.getElementById('my_shopping_list').appendChild(title_my_shopping_list);
    }

    var component_length = data['extendedIngredients'].length;

    for (var i = 0; i < component_length; i++) {

        // יצירת div 
        var shoping_element = document.createElement("div");
        shoping_element.className = "shoping_element";
        shoping_element.id = "shoping_element_" + i;
        document.getElementById('my_shopping_list').appendChild(shoping_element);

        var unit = data['extendedIngredients'][i]['unit'];
        var originalName = data['extendedIngredients'][i]['originalName'];

        // אפשרות להוספה והורדה של מוצרים
        var change_amount = document.createElement('input');
        change_amount.className = 'change_amount';
        change_amount.type = "text";
        change_amount.id = "input_" + i;
        change_amount.value = data['extendedIngredients'][i]['amount'] / data['servings'] * diners;
        shoping_element.appendChild(change_amount);

        // div לכפתורים הוספה והורדת רכיבים
        var div_button_add_remove = document.createElement("div");
        div_button_add_remove.className = "div_button_add_remove";
        shoping_element.appendChild(div_button_add_remove);

        // הכנת כמות מידה
        var amount = data['extendedIngredients'][i]['amount'] > 1 ? 1 : data['extendedIngredients'][i]['amount'];

        // כפתור הוספת כמות 
        var button_add_component = document.createElement('button');
        button_add_component.className = 'button_add_component';
        button_add_component.innerHTML = "+";
        button_add_component.id = i; // input name
        button_add_component.dataset.amount = amount;
        button_add_component.addEventListener('click', (function (id, amount) {
            return function () {
                add("input_" + id, amount);
            }
        })(button_add_component.id, button_add_component.dataset.amount));
        div_button_add_remove.appendChild(button_add_component);

        // כפתור הפחתת כמות 
        var button_remove_component = document.createElement('button');
        button_remove_component.className = 'button_remove_component';
        button_remove_component.innerHTML = "-";
        button_remove_component.id = i; // input name
        button_remove_component.dataset.amount = amount;
        button_remove_component.addEventListener('click', (function (id, amount) {
            return function () {
                remove("input_" + id, amount);
            }
        })(button_remove_component.id, button_remove_component.dataset.amount));
        div_button_add_remove.appendChild(button_remove_component);

        // הצגת שם המוצר
        var shoping_element_text = document.createElement('p');
        shoping_element_text.className = "shoping_element_text";
        shoping_element_text.innerText = unit + " " + originalName;
        shoping_element.appendChild(shoping_element_text);

        // כפתור מחיקת מוצר מהרשימה 
        var button_remove_product = document.createElement('button');
        button_remove_product.className = 'button_remove_product';
        button_remove_product.innerHTML = "x";
        button_remove_product.id = "shoping_element_" + i;
        button_remove_product.addEventListener('click', (function (id) {
            return function () {
                remove_product(id);
            }
        })(button_remove_product.id));
        shoping_element.appendChild(button_remove_product);
    }
}

function remove_product(id) {
    document.getElementById(id).remove();
}

function add(idElement, amount) {
    document.getElementById(idElement).value = parseFloat(document.getElementById(idElement).value) + parseFloat(amount);
}

function remove(idElement, amount) {
    document.getElementById(idElement).value = parseFloat(document.getElementById(idElement).value) - parseFloat(amount);
}