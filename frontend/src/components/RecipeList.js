const RecipeList = (props) => {
    const recipes = props.recipes;

    return (  
        <div className="recipe-list">
            {recipes.map(recipe => (
                <div className="recipe-wrapper" key={recipe.id}>
                    <div className="recipe-title">
                        { recipe.title }
                    </div>
                    <div className="recipe-description">
                        { recipe.description }
                    </div>
                </div>
            ))}
        </div>
    );
}
 
export default RecipeList;