//// file: repositories/movie_repository.go
//
package repositories

import (
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"sync"
)

var likeInstance *likeRepository
var likeOnce sync.Once

func GetLikeRepository() *likeRepository {
	likeOnce.Do(func() {
		likeInstance = &likeRepository{}
	})
	return likeInstance
}

type likeRepository struct {
}

func (re likeRepository) LikeOrNot(userId interface{}, postId interface{}) bool {
	like := models.Like{}
	sqlhelper.SelectOne(like, "likeBy=? AND postID=?", userId, postId)
	if like.ID == 0 {
		return false
	}
	return true
}
