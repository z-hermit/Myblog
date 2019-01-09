package models

import "mywork.com/Myblog/server/infrastructure/datamodels"

type Post struct {
	datamodels.Post
	liked   []int
	created int
}
