package datamodels

import "github.com/jinzhu/gorm"

type Like struct {
	gorm.Model
	PostID int `json:"postID"`
	LikeBy int `json:"likeBy"`
}
