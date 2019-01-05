//// file: repositories/movie_repository.go
//
package repositories

import (
	"log"
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"sync"
)

var postInstance *postRepository
var postOnce sync.Once

func GetpostRepository() *postRepository {
	postOnce.Do(func() {
		postInstance = &postRepository{}
	})
	return postInstance
}

type postRepository struct {
}

func (re postRepository) GetRelativePost(id interface{}) []models.Post {
	db := sqlhelper.DB()
	posts := []models.Post{}

	stmt, _ := db.Prepare("SELECT posts.id, posts.title, posts.content, posts.createdBy, posts.createdAt from posts, follow WHERE follow.followBy=? AND follow.followTo = posts.createdBy ORDER BY posts.postID DESC")
	rows, qErr := stmt.Query(id)
	log.Panic(qErr)

	for rows.Next() {
		post := models.Post{}
		rows.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedBy, &post.CreatedAt)
		posts = append(posts, post)
	}
	return posts
}
