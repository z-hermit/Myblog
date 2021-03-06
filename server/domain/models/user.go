package models

import (
	"log"
	"mywork.com/Myblog/server/infrastructure/datamodels"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
)

type User struct {
	datamodels.User
	Followers  []int  `json:"followers"`
	Followings []int  `json:"followings"`
	Posts      []Post `json:"posts"`
	Likes      []int  `json:"likes"`
}

func GetUser(id int) *User {
	user := User{}
	user.ID = id
	return &user
}

func (u *User) Update() *User {
	sqlhelper.Select(u, "id=?", u.ID)

	follows := []Follow{}
	sqlhelper.Select(&follows, "follow_to=?", u.ID)
	for _, v := range follows {
		u.Followers = append(u.Followers, v.FollowBy)
	}

	followings := []Follow{}
	sqlhelper.Select(&followings, "follow_by=?", u.ID)
	for _, v := range followings {
		u.Followings = append(u.Followings, v.FollowTo)
	}

	posts := []Post{}
	sqlhelper.Select(&posts, "created_by=?", u.ID)
	for _, v := range posts {
		v.CreatedBy = u.ID
		u.Posts = append(u.Posts, v)
	}

	likes := []Like{}
	sqlhelper.Select(&likes, "like_by=?", u.ID)
	for _, v := range likes {
		u.Likes = append(u.Likes, v.ID)
	}
	return u
}

func (u User) CountOfFollow() int {
	follows := []Follow{}
	sqlhelper.Select(&follows, "follow_to=?", u.ID)
	return len(follows)
}

func IsFollowing(by int, to int) bool {
	follow := Follow{}
	sqlhelper.SelectOne(&follow, "follow_by=? AND follow_to=?", by, to)
	if follow.ID == 0 {
		return false
	}
	return true
}

func CountofFollow(id int) int {

	var followersCount int
	sqlhelper.DB().QueryRow("SELECT COUNT(followID) AS followersCount FROM follow WHERE followTo=?", id).Scan(&followersCount)
	return followersCount

}

func (u User) GetRelativePost() []Post {
	db := sqlhelper.DB()
	posts := []Post{}

	stmt, _ := db.Prepare("SELECT posts.id, posts.title, posts.content, posts.createdBy, posts.createdAt from posts, follow WHERE follow.followBy=? AND follow.followTo = posts.createdBy ORDER BY posts.postID DESC")
	rows, qErr := stmt.Query(u.ID)
	log.Panic(qErr)

	for rows.Next() {
		post := Post{}
		rows.Scan(&post.ID, &post.Title, &post.Content, &post.CreatedBy, &post.CreatedAt)
		posts = append(posts, post)
	}
	return posts
}

func (u User) LikeOrNot(postId interface{}) bool {
	like := Like{}
	sqlhelper.SelectOne(&like, "like_by=? AND post_id=?", u.ID, postId)
	if like.ID == 0 {
		return false
	}
	return true
}
