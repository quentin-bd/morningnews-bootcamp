export default function (likedArticles = [], action) {
    if (action.type == 'addArticle') {
        var optimize = likedArticles.find(art => art.title == action.newArticle.title);
        if (optimize == undefined) {
            var likedArticlesAdd = [...likedArticles];
            likedArticlesAdd.push(action.newArticle);
            return likedArticlesAdd;
        }
        return likedArticles;
    } else if (action.type == 'deleteArticle') {
        var likedArticlesUpdate = likedArticles.filter(art => art !== action.articleToDelete);
        return likedArticlesUpdate;
    } else {
        return likedArticles;
    }
}