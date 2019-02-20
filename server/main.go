package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/recover"
	"github.com/spf13/viper"
	R "mywork.com/Myblog/server/application/routes"
	"mywork.com/Myblog/server/application/session"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
)

func main() {
	sqlhelper.Myinit()
	session.Myinit()
	viper.SetConfigName("config")    // name of config file (without extension)
	viper.AddConfigPath("./")        // optionally look for config in the working directory
	viper.AddConfigPath("./config/") // optionally look for config in the working directory
	err := viper.ReadInConfig()      // Find and read the config file
	if err != nil {                  // Handle errors reading the config file
		fmt.Println("Fatal error config file:", err)
		return
	}

	app := iris.New()
	app.Use(recover.New())

	app.StaticWeb("/", "./public")

	user := app.Party("/user")
	{
		user.Post("/signup", R.UserSignup)
		user.Post("/login", R.UserLogin)
	}

	get := app.Party("/get")
	{
		get.Get("/", R.Index)
		get.Get("/explore", R.Explore)
		get.Get("/logout", R.Logout)
		get.Get("/edit_profile", R.EditProfile)

		get.Get("/profile/:id", R.Profile)

		get.Get("/view_post/:id", R.ViewPost)

		get.Get("/edit_post/:id", R.EditPost)

		get.Get("/followers/:id", R.Followers)

		get.Get("/followings/:id", R.Followings)

		get.Get("/likes/:id", R.Likes)
	}

	api := app.Party("/api")
	{
		api.Post("/create_new_post", R.CreateNewPost)
		api.Post("/delete_post", R.DeletePost)
		api.Post("/update_post", R.UpdatePost)
		api.Post("/update_profile", R.UpdateProfile)
		api.Post("/change_avatar", R.ChangeAvatar)
		api.Post("/follow", R.Follow)
		api.Post("/unfollow", R.Unfollow)
		api.Post("/like", R.Like)
		api.Post("/unlike", R.Unlike)
		api.Post("/deactivate-account", R.DeactivateAcc)
	}

	app.Run(iris.Addr(viper.GetString("port")))
}
