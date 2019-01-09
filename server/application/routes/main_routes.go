package routes

import (
	"strconv"

	"fmt"
	"github.com/kataras/iris"
	"mywork.com/Myblog/server/application/session"
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/datamodels"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
)

// Index route
func Index(ctx iris.Context) {
	loggedIn(ctx, "/welcome")

	id, _ := session.UserSessions(ctx)
	user := models.User{}
	user.ID = id
	posts := user.GetRelativePost()
	json(ctx, models.SUCCESS, "success", posts)
}

// Profile Page
func Profile(ctx iris.Context) {
	loggedIn(ctx, "/welcome")

	uid, err := ctx.Params().GetInt("id")
	if err != nil {
		fmt.Println(err)
	}
	sid, _ := session.UserSessions(ctx)

	me := session.MeOrNot(ctx, uid) // Check if its me or not
	var noMssg string               // Mssg to be displayed when user has no posts

	// VIEW PROFILE
	user := models.GetUser(uid)
	user.Update()

	if me == true {
		noMssg = "You have no posts. Go ahead and create one!!"
	} else {
		noMssg = user.Username + " has no posts!!"

		if sid != 0 {
			profileView := models.ProfileView{datamodels.ProfileView{ViewBy: sid, ViewTo: uid}}
			err := sqlhelper.Insert(&profileView)
			if err != nil {
				fmt.Println(err)
			}
		}
	}

	//followings := []models.Follow{}
	//sqlhelper.Select(&followings, "followBy=?", uid)

	json(ctx, models.SUCCESS, "profile", iris.Map{
		"title":   "@" + user.Username,
		"session": ses(ctx),
		"user":    user,
		"no_mssg": noMssg,
		"isF":     models.IsFollowing(sid, uid),
	})

}

// Explore route
func Explore(ctx iris.Context) {
	loggedIn(ctx, "/welcome")
	user, _ := session.UserSessions(ctx)
	db := sqlhelper.DB()
	var (
		id       int
		username string
		email    string
	)
	explore := []interface{}{}

	stmt, _ := db.Prepare("SELECT id, username, email FROM users WHERE id <> ? ORDER BY RAND() LIMIT 10")
	rows, err := stmt.Query(user)
	session.LogErr(err)

	for rows.Next() {
		rows.Scan(&id, &username, &email)
		exp := map[string]interface{}{
			"id":       id,
			"username": username,
			"email":    email,
		}
		explore = append(explore, exp)
	}

	json(ctx, models.SUCCESS, "explore", iris.Map{
		"title":   "Explore",
		"session": ses(ctx),
		"users":   explore,
		"countF":  models.CountofFollow(user),
	})
}

// ViewPost route
func ViewPost(ctx iris.Context) {
	loggedIn(ctx, "")

	param := ctx.Params().Get("id")
	db := sqlhelper.DB()
	var (
		postCount int
		postID    int
		title     string
		content   string
		createdBy int
		createdAt string
	)
	var likesCount int

	// post details
	db.QueryRow("SELECT COUNT(postID) AS postCount, postID, title, content, createdBy, createdAt FROM posts WHERE postID=?", param).Scan(&postCount, &postID, &title, &content, &createdBy, &createdAt)
	invalid(ctx, postCount)

	// likes
	db.QueryRow("SELECT COUNT(likeID) AS likesCount FROM likes WHERE postID=?", param).Scan(&likesCount)

	id, _ := session.UserSessions(ctx)
	user := models.GetUser(id)
	json(ctx, models.SUCCESS, "view_post", iris.Map{
		"title":   "View Post",
		"session": ses(ctx),
		"post": iris.Map{
			"postID":    postID,
			"title":     title,
			"content":   content,
			"createdBy": createdBy,
			"createdAt": createdAt,
		},
		"postCreatedBy": strconv.Itoa(createdBy),
		"lon":           user.LikeOrNot(postID),
		"likes":         likesCount,
	})
}

// EditPost route
func EditPost(ctx iris.Context) {
	loggedIn(ctx, "")

	post := ctx.Params().Get("id")
	db := sqlhelper.DB()
	var (
		postCount int
		postID    int
		title     string
		content   string
	)

	db.QueryRow("SELECT COUNT(postID) AS postCount, postID, title, content FROM posts WHERE postID=?", post).Scan(&postCount, &postID, &title, &content)
	invalid(ctx, postCount)

	json(ctx, models.SUCCESS, "edit_post", iris.Map{
		"title":   "Edit Post",
		"session": ses(ctx),
		"post": iris.Map{
			"postID":  postID,
			"title":   title,
			"content": content,
		},
	})
}

// EditProfile route
func EditProfile(ctx iris.Context) {
	loggedIn(ctx, "")

	db := sqlhelper.DB()
	id, _ := session.UserSessions(ctx)
	var (
		email  string
		bio    string
		joined string
	)
	db.QueryRow("SELECT email, bio, joined FROM users WHERE id=?", id).Scan(&email, &bio, &joined)
	json(ctx, models.SUCCESS, "edit_profile", iris.Map{
		"title":   "Edit Profile",
		"session": ses(ctx),
		"email":   email,
		"bio":     bio,
		"joined":  joined,
	})
}

// Followers route
func Followers(ctx iris.Context) {
	loggedIn(ctx, "")

	user, _ := ctx.Params().GetInt("id")
	db := sqlhelper.DB()
	var followBy int
	followers := []interface{}{}

	stmt, _ := db.Prepare("SELECT followBy FROM follow WHERE followTo=? ORDER BY followID DESC")
	rows, fErr := stmt.Query(user)
	session.LogErr(fErr)

	for rows.Next() {
		rows.Scan(&followBy)
		f := map[string]interface{}{
			"followBy": followBy,
		}
		followers = append(followers, f)
	}

	json(ctx, models.SUCCESS, "followers", iris.Map{
		"session":   ses(ctx),
		"followers": followers,
	})
}

// Followings route
func Followings(ctx iris.Context) {
	loggedIn(ctx, "")

	user := ctx.Params().Get("id")
	db := sqlhelper.DB()
	var followTo int
	followings := []interface{}{}
	var noMssg string

	stmt, _ := db.Prepare("SELECT followTo FROM follow WHERE followBy=? ORDER BY followID DESC")
	rows, fErr := stmt.Query(user)
	session.LogErr(fErr)

	for rows.Next() {
		rows.Scan(&followTo)
		f := map[string]interface{}{
			"followTo": followTo,
		}
		followings = append(followings, f)
	}

	json(ctx, models.SUCCESS, "followings", iris.Map{
		"session":    ses(ctx),
		"followings": followings,
		"no_mssg":    noMssg + " have no followings!!",
	})
}

// Likes route
func Likes(ctx iris.Context) {
	loggedIn(ctx, "")

	post := ctx.Params().Get("id")
	db := sqlhelper.DB()
	var postCount int
	var likeBy int
	likes := []interface{}{}

	db.QueryRow("SELECT COUNT(postID) AS postCount FROM posts WHERE postID=?", post).Scan(&postCount)
	invalid(ctx, postCount)

	stmt, _ := db.Prepare("SELECT likeBy FROM likes WHERE postID=?")
	rows, err := stmt.Query(post)
	session.LogErr(err)

	for rows.Next() {
		rows.Scan(&likeBy)
		l := map[string]interface{}{
			"likeBy": likeBy,
		}
		likes = append(likes, l)
	}

	json(ctx, models.SUCCESS, "likes", iris.Map{
		"title":   "Likes",
		"session": ses(ctx),
		"likes":   likes,
	})
}
