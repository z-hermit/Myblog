package datamodels

import "github.com/jinzhu/gorm"

type Post struct {
	gorm.Model
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedBy int    `json:"createdBy"`
}
