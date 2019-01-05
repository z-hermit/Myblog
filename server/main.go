package main

import (
	"fmt"
	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/recover"
	"github.com/spf13/viper"
	R "mywork.com/Myblog/server/application/routes"
)

func main() {
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

	app.Get("/", R.Index)
	app.Get("/explore", R.Explore)
	app.Get("/logout", R.Logout)
	app.Get("/deactivate", R.Deactivate)
	app.Get("/edit_profile", R.EditProfile)
	app.Get("/create_post", R.CreatePost)

	app.Get("/profile/:id", R.Profile)

	app.Get("/view_post/:id", R.ViewPost)

	app.Get("/edit_post/:id", R.EditPost)

	app.Get("/followers/:id", R.Followers)

	app.Get("/followings/:id", R.Followings)

	app.Get("/likes/:id", R.Likes)

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
