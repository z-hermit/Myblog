package datamodels

import "github.com/jinzhu/gorm"

type Follow struct {
	gorm.Model
	FollowID int `json:"followID"`
	FollowBy int `json:"followBy"`
	FollowTo int `json:"followTo"`
}
