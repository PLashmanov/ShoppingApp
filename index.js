import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref , push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://realtime-database-3f565-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDb = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
   
    let inputValue = inputEl.value
    push(shoppingListInDb, inputValue)
    clearInputFieldEl()
    
})

onValue(shoppingListInDb,function(snapshot){
    if (snapshot.exists()){
        let shoppingArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    for (let i = 0; i < shoppingArray.length; i++){
        let currentItem = shoppingArray[i]
        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
        }
        
    }else{
        shoppingListEl.innerHTML = "no items here.... yet"
    }
    
})

function clearInputFieldEl(){
    inputEl.value = ""
}
function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let exactLocationOfItemInDb = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDb)
    })

    shoppingListEl.append(newEl)


}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}