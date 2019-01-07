//// file: repositories/movie_repository.go
//
package repositories

import (
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"sync"
)

var instance *userRepository
var once sync.Once

func getUserRepository() *userRepository {
	once.Do(func() {
		instance = &userRepository{}
	})
	return instance
}

type userRepository struct {
	OnlineUser int
}

func (re userRepository) Get(id interface{}) models.User {
	user := models.User{}
	sqlhelper.SelectOne(&user, "id", id)
	return user
}

func (re userRepository) GetRandom(id int, limit int) []models.User {
	users := []models.User{}
	sqlhelper.SelectRandom(&users, limit, "WHERE id <> ?", id)
	return users
}
