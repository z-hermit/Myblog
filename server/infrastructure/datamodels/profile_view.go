package datamodels

import "github.com/jinzhu/gorm"

// ProfileView is an object representing the database table.
type ProfileView struct {
	gorm.Model
	ViewBy int `json:"viewBy"`
	ViewTo int `json:"viewTo"`
}
