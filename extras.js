function parseCategory(categories){
    let capitalisedCategories = categories==="general_knowledge" ? //ternary expression to check if category is "general_knowledge"
        "General Knowledge" : //handle special case, else...
        categories.replace("_", " and ")//replace underscore with 'and'
        .split(" ")//split string into words
        .map((word) => word === "and" ? "and" : word.charAt(0).toUpperCase() + word.slice(1)).join(" ");//capitalise first letter of each word except 'and'
    console.log(capitalisedCategories);
}