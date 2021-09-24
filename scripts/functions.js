let allRecipes = []
let allRecipesObjects = []
let allFilters = []
let totalFiltersClicked = 0

function createRecipesObject() {
    // Ici on boucle sur l'ensemble des recettes du fichier recipes.js
    recipes.forEach(function (oneRecipe) {

        // Ici on instancie notre recette
        let oneNewRecipeObject = new Recipe(oneRecipe.name, oneRecipe.time, oneRecipe.description)

        // Ici on ajoute nos ingrédients à notre recette
        oneRecipe.ingredients.forEach(function (oneIngredient) {
            let oneIngredientObject = new Ingredient(oneIngredient.ingredient, oneIngredient.quantity, oneIngredient.unit)
            oneNewRecipeObject.addIngredient(oneIngredientObject)
        })

        // Ici on ajoute les ustensiles à notre recette
        oneRecipe.ustensils.forEach(function (oneUstensil) {
            let oneUstensilObject = new Ustensil(oneUstensil)
            oneNewRecipeObject.addUstensil(oneUstensilObject)
        })

        // Ici on ajoute le plat à la recette
        let oneApplianceObject = new Appliance(oneRecipe.appliance)
        oneNewRecipeObject.addAppliance(oneApplianceObject)

        // On stocke notre recette complète dans notre allRecipes
        allRecipes.push(oneNewRecipeObject)

    })
    allRecipesObjects = allRecipes
}

function getFilters() {

    let allIngredientsFilters = []
    let allAppliancesFilters = []
    let allUstensilsFilters = []

    allRecipes.forEach(function (oneRecipe) {
        oneRecipe.ingredients.forEach(function (oneIngredient) {
            if (allIngredientsFilters.includes(oneIngredient.name) === false) {
                allIngredientsFilters.push(oneIngredient.name)
            }
        })

        oneRecipe.appliances.forEach(function (oneAppliance) {
            if (allAppliancesFilters.includes(oneAppliance.name) === false) {
                allAppliancesFilters.push(oneAppliance.name)
            }
        })

        oneRecipe.ustensils.forEach(function (oneUstensil) {
            if (allUstensilsFilters.includes(oneUstensil.name) === false) {
                allUstensilsFilters.push(oneUstensil.name)
            }
        })
    })

    allFilters = [allAppliancesFilters, allIngredientsFilters, allUstensilsFilters]
    displayFilters()
}

let activeFilters = []
function displayFilters() {

    console.log("ActiveFilters : ", activeFilters)
    // Permet de lier allFilters[0], allFilters[1] et allFilters[2] à leur conteneurs respectifs
    let arrayConfig = [
        "allAppliances", // 0
        "allIngredients", // 1
        "allUstensils" // 2
    ]

    // On boucle sur notre tableau de configuration pour mettre tous les filtres
    arrayConfig.forEach(function (containerName, index) {
        // Ici on récupère le conteneur du filtre courant
        let container = document.getElementById(containerName)

        // Ici on vide le conteneur courant
        container.textContent = ""

        // Ici on ajoute chaque valeur de notre filtre
        allFilters[index].forEach(function (oneElement) {
            let elementToAdd = document.createElement("div")
            elementToAdd.classList.add("col-4")
            elementToAdd.textContent = oneElement
            if (activeFilters.includes(oneElement) === false) {
                elementToAdd.classList.add("pointer")
                elementToAdd.addEventListener("click", function () {
                    activeFilters.push(oneElement)
                    addFilter(oneElement, index)
                })
            } else {
                elementToAdd.classList.add("line-through")
            }
            container.appendChild(elementToAdd)
        })
    })
}


let ingredientsHidden = true
let appliancesHidden = true
let ustensilsHidden = true

function createEventsForFilters() {

    document.getElementById("displayIngredient").addEventListener("click", function () {
        ingredientsHidden = !ingredientsHidden
        document.getElementById("allIngredients").hidden = ingredientsHidden
    })

    document.getElementById("displayAppliances").addEventListener("click", function () {
        appliancesHidden = !appliancesHidden
        document.getElementById("allAppliances").hidden = appliancesHidden
    })

    document.getElementById("displayUstensils").addEventListener("click", function () {
        ustensilsHidden = !ustensilsHidden
        document.getElementById("allUstensils").hidden = ustensilsHidden
    })
}

function addFilter(filteredElement, typeOfElement) {

    totalFiltersClicked += 1
    // la même chose que : totalFiltersClicked = totalFiltersClicked + 1

    let type = [
        "appliances",
        "ingredients",
        "ustensils"
    ]

    addFilterBox(filteredElement, typeOfElement)


    allRecipesObjects.forEach(function (oneRecipe) {
        if (type[typeOfElement] === "appliances") {
            oneRecipe.appliances.forEach(function (oneAppliance) {
                if (filteredElement === oneAppliance.name) {
                    oneRecipe.hasFilters += 1
                    // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
                }
            })
        }
        if (type[typeOfElement] === "ingredients") {
            oneRecipe.ingredients.forEach(function (oneIngredient) {
                if (filteredElement === oneIngredient.name) {
                    oneRecipe.hasFilters += 1
                    // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
                }
            })
        }
        if (type[typeOfElement] === "ustensils") {
            oneRecipe.ustensils.forEach(function (oneUstensil) {
                if (filteredElement === oneUstensil.name) {
                    oneRecipe.hasFilters += 1
                    // la même chose que : oneRecipe.hasFilters = oneRecipe.hasFilter + 1
                }
            })
        }
    })
    getValidRecipes()
}

function removeFilter(filteredElement, typeOfElement) {
    totalFiltersClicked -= 1

    let type = [
        "appliances",
        "ingredients",
        "ustensils"
    ]

    allRecipes.forEach(function (oneRecipe) {
        if (type[typeOfElement] === "appliances") {
            oneRecipe.appliances.forEach(function (oneAppliance) {
                if (filteredElement === oneAppliance.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
        if (type[typeOfElement] === "ingredients") {
            oneRecipe.ingredients.forEach(function (oneIngredient) {
                if (filteredElement === oneIngredient.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
        if (type[typeOfElement] === "ustensils") {
            oneRecipe.ustensils.forEach(function (oneUstensil) {
                if (filteredElement === oneUstensil.name) {
                    oneRecipe.hasFilters -= 1
                }
            })
        }
    })
    getValidRecipes()
}

function getValidRecipes(input = false) {

    let validRecipes = []
    allRecipesObjects.forEach(function (oneRecipe) {
        if (oneRecipe.hasFilters === totalFiltersClicked) {
            if (input !== false) {
                if (oneRecipe.name.includes(input)) {
                    validRecipes.push(oneRecipe)
                }
            } else {
                validRecipes.push(oneRecipe)
            }
        }
    })
    allRecipes = validRecipes
    displayRecipes()
    getFilters()
}

function displayRecipes() {
    let container = document.getElementById("recipes")
    container.innerText = ""
    allRecipes.forEach(function (oneRecipe) {
        let template = `<div class="col-3 text-center border border-dark recipe-box">
                            <div class="row">
                                <div class="col-12">
                                    <h2>Recette</h2>
                                </div>
                                <div class="col-12">
                                    <h3>${oneRecipe.name}</h3>
                                </div>
                                <div class="col-12">
                                    ${oneRecipe.description}
                                </div>
                            </div>
                        </div>`
        container.innerHTML += template
    })
}

function addFilterBox(name, type) {

    let colors = [
        "success",
        "primary",
        "danger"
    ]

    let container = document.getElementById("activeFilters")
    let template = `<div class="rounded mb-2 col-4 col-sm-3 col-lg-2 border border-dark mr-1 bg-${colors[type]} text-white" id="box-${name}">
                        <div class="row">
                            <div class="col-10 box-display" >
                                ${name}
                            </div>
                            <div class="col-2 p-0 m-auto pointer removeElement" id="remove-${name}">
                                <i class="far fa-times-circle"></i>
                            </div>
                        </div>
                    </div>`

    container.insertAdjacentHTML('beforeend', template)
    let cross = document.getElementById("remove-" + name)
    console.log("On crée l'évent")
    cross.addEventListener("click", function () {
        let box = document.getElementById("box-" + name)
        box.remove()
        activeFilters.forEach(function(oneFilter, index){
            if (oneFilter === name) {
                activeFilters.splice(index, 1)
            }
        })
        removeFilter(name, type)
    })
}

function getInputEvent(e){
    document.getElementById("input-search").addEventListener("input", function(){
        getValidRecipes(this.value)
    })
}