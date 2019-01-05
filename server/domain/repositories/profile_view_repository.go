//// file: repositories/movie_repository.go
//
package repositories

import (
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"sync"
)

var profileViewInstance *profileViewRepository
var profileViewOnce sync.Once

func GetprofileViewRepository() *profileViewRepository {
	profileViewOnce.Do(func() {
		profileViewInstance = &profileViewRepository{}
	})
	return profileViewInstance
}

type profileViewRepository struct {
}

func (re profileViewRepository) IsprofileViewing(by string, to string) bool {
	profileView := models.ProfileView{}
	sqlhelper.SelectOne(profileView, "profileView_by=?, profileView_to", by, to)
	if profileView.ID == 0 {
		return false
	}
	return true
}
