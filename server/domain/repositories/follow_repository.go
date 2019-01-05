//// file: repositories/movie_repository.go
//
package repositories

import (
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"sync"
)

var followInstance *followRepository
var followOnce sync.Once

func GetFollowRepository() *followRepository {
	followOnce.Do(func() {
		followInstance = &followRepository{}
	})
	return followInstance
}

type followRepository struct {
}

func (re followRepository) IsFollowing(by string, to string) bool {
	follow := models.Follow{}
	sqlhelper.SelectOne(&follow, "follow_by=?, follow_to", by, to)
	if follow.ID == 0 {
		return false
	}
	return true
}

func (re followRepository) CountOfFollow(to string) int {
	follows := []models.Follow{}
	sqlhelper.Select(&follows, "follow_to", to)
	return len(follows)
}
