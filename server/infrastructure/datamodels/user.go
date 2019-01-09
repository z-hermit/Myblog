package datamodels

import (
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Username string `json:"username"`
	Email    string `json:"email"`
	Password []byte `json:"-"`
	Bio      string `json:"bio"`
}
