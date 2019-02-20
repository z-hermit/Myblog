package routes

import (
	"os"
	"time"

	"github.com/badoux/checkmail"
	"github.com/kataras/iris"
	"mywork.com/Myblog/server/application/session"
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"strconv"
)

// CreateNewPost route
func CreateNewPost(ctx iris.Context) {
	title := ctx.PostValueTrim("title")
	content := ctx.PostValueTrim("content")
	id, _ := session.UserSessions(ctx)
	db := sqlhelper.DB()

	stmt, _ := db.Prepare("INSERT INTO posts(title, content, createdBy, createdAt) VALUES (?, ?, ?, ?)")
	rs, iErr := stmt.Exec(title, content, id, time.Now())
	session.LogErr(iErr)
	insertID, _ := rs.LastInsertId()

	resp := map[string]interface{}{
		"postID": insertID,
		"mssg":   "Post Created!!",
	}
	json(ctx, models.SUCCESS, "", resp)
}

// DeletePost route
func DeletePost(ctx iris.Context) {
	post := ctx.FormValue("post")
	db := sqlhelper.DB()

	_, dErr := db.Exec("DELETE FROM posts WHERE postID=?", post)
	session.LogErr(dErr)

	json(ctx, models.SUCCESS, "", map[string]interface{}{
		"mssg": "Post Deleted!!",
	})
}

// UpdatePost route
func UpdatePost(ctx iris.Context) {
	postID := ctx.PostValue("postID")
	title := ctx.PostValue("title")
	content := ctx.PostValue("content")

	db := sqlhelper.DB()
	db.Exec("UPDATE posts SET title=?, content=? WHERE postID=?", title, content, postID)

	json(ctx, models.SUCCESS, "", map[string]interface{}{
		"mssg": "Post Updated!!",
	})
}

// UpdateProfile route
func UpdateProfile(ctx iris.Context) {
	resp := make(map[string]interface{})

	id, _ := session.UserSessions(ctx)
	username := ctx.PostValueTrim("username")
	email := ctx.PostValueTrim("email")
	bio := ctx.PostValueTrim("bio")

	mailErr := checkmail.ValidateFormat(email)
	db := sqlhelper.DB()

	if username == "" || email == "" {
		resp["mssg"] = "Some values are missing!!"
	} else if mailErr != nil {
		resp["mssg"] = "Invalid email format!!"
	} else {
		_, iErr := db.Exec("UPDATE users SET username=?, email=?, bio=? WHERE id=?", username, email, bio, id)
		session.LogErr(iErr)

		session.SetSession(ctx, session.USERNAME, username)

		resp["mssg"] = "Profile updated!!"
		resp["success"] = true
	}

	json(ctx, models.SUCCESS, "", resp)
}

// ChangeAvatar route
func ChangeAvatar(ctx iris.Context) {
	resp := make(map[string]interface{})
	id, _ := session.UserSessions(ctx)

	dir, _ := os.Getwd()
	dest := dir + "/public/users/" + strconv.Itoa(id) + "/avatar.png"

	dErr := os.Remove(dest)
	session.LogErr(dErr)

	// avatar key of post form file, but let's grab all of them,
	// the `ctx.FormFile` can be used to manually upload files per post key to the server.
	_, upErr := ctx.UploadFormFiles(dest)

	if upErr != nil {
		resp["mssg"] = "An error occured!!"
	} else {
		resp["mssg"] = "Avatar changed!!"
		resp["success"] = true
	}

	json(ctx, models.SUCCESS, "", resp)
}

// Follow route
func Follow(ctx iris.Context) {
	id, _ := session.UserSessions(ctx)
	user := ctx.PostValue("user")

	db := sqlhelper.DB()
	stmt, _ := db.Prepare("INSERT INTO follow(followBy, followTo, followTime) VALUES(?, ?, ?)")
	_, exErr := stmt.Exec(id, user, time.Now())
	session.LogErr(exErr)

	json(ctx, models.SUCCESS, "", nil)
}

// Unfollow route
func Unfollow(ctx iris.Context) {
	id, _ := session.UserSessions(ctx)
	user := ctx.PostValue("user")

	db := sqlhelper.DB()
	stmt, _ := db.Prepare("DELETE FROM follow WHERE followBy=? AND followTo=?")
	_, dErr := stmt.Exec(id, user)
	session.LogErr(dErr)

	json(ctx, models.SUCCESS, "", nil)
}

// Like post route
func Like(ctx iris.Context) {
	post := ctx.PostValue("post")
	db := sqlhelper.DB()
	id, _ := session.UserSessions(ctx)

	stmt, _ := db.Prepare("INSERT INTO likes(postID, likeBy, likeTime) VALUES (?, ?, ?)")
	_, err := stmt.Exec(post, id, time.Now())
	session.LogErr(err)

	json(ctx, models.SUCCESS, "", iris.Map{
		"mssg": "Post Liked!!",
	})
}

// Unlike post route
func Unlike(ctx iris.Context) {
	post := ctx.PostValue("post")
	id, _ := session.UserSessions(ctx)
	db := sqlhelper.DB()

	stmt, _ := db.Prepare("DELETE FROM likes WHERE postID=? AND likeBy=?")
	_, err := stmt.Exec(post, id)
	session.LogErr(err)

	json(ctx, models.SUCCESS, "", iris.Map{
		"mssg": "Post Unliked!!",
	})
}

// DeactivateAcc route post method
func DeactivateAcc(ctx iris.Context) {
	id, _ := session.UserSessions(ctx)
	db := sqlhelper.DB()
	var postID int

	db.Exec("DELETE FROM profile_views WHERE viewBy=?", id)
	db.Exec("DELETE FROM profile_views WHERE viewTo=?", id)
	db.Exec("DELETE FROM follow WHERE followBy=?", id)
	db.Exec("DELETE FROM follow WHERE followTo=?", id)
	db.Exec("DELETE FROM likes WHERE likeBy=?", id)

	rows, _ := db.Query("SELECT postID FROM posts WHERE createdBy=?", id)
	for rows.Next() {
		rows.Scan(&postID)
		db.Exec("DELETE FROM likes WHERE postID=?", postID)
	}

	db.Exec("DELETE FROM posts WHERE createdBy=?", id)
	db.Exec("DELETE FROM users WHERE id=?", id)

	dir, _ := os.Getwd()
	userPath := dir + "/public/users/" + strconv.Itoa(id)

	rmErr := os.RemoveAll(userPath)
	session.LogErr(rmErr)

	// session.Delete("id")
	// session.Delete("username")
	// or
	session.DestorySession(ctx)

	json(ctx, models.SUCCESS, "", iris.Map{
		"mssg": "Deactivated your account!!",
	})
}
