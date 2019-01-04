package datamodels

import "github.com/jinzhu/gorm"

type Like struct {
	gorm.Model
	LikeID int `json:"likeID"`
	PostID int `json:"postID"`
	LikeBy int `json:"likeBy"`
}
