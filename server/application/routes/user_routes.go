package routes

import (
	"fmt"
	"github.com/badoux/checkmail"
	"github.com/kataras/iris"
	"golang.org/x/crypto/bcrypt"
	"mywork.com/Myblog/server/application/session"
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure/datamodels"
	"mywork.com/Myblog/server/infrastructure/sqlhelper"
	"os"
	"strconv"
)

// Logout route
func Logout(ctx iris.Context) {
	loggedIn(ctx, "")
	session.DestorySession(ctx)
	// or
	// session.Delete("id")
	// session.Delete("username")
	// if just delete the values.
	ctx.Redirect("/login")
}

// UserSignup function to register user
func UserSignup(ctx iris.Context) {
	username := ctx.PostValueTrim("username")
	email := ctx.PostValueTrim("email")
	password := ctx.PostValueTrim("password")
	passwordAgain := ctx.PostValueTrim("password_again")

	mailErr := checkmail.ValidateFormat(email)

	var (
		userCount  int
		emailCount int
		response   models.JsonResponse
	)

	response.Code = models.FAIL
	userCount = sqlhelper.Count("User", "username=?", username)
	emailCount = sqlhelper.Count("User", "email=?", email)

	if username == "" || email == "" || password == "" || passwordAgain == "" {
		response.Msg = "Some values are missing!!"
	} else if len(username) < 4 || len(username) > 32 {
		response.Msg = "Username should be between 4 and 32"
	} else if mailErr != nil {
		response.Msg = "Invalid email format!!"
	} else if password != passwordAgain {
		response.Msg = "Passwords don't match"
	} else if userCount > 0 {
		response.Msg = "Username already exists!!"
	} else if emailCount > 0 {
		response.Msg = "Email already exists!!"
	} else {
		user := datamodels.User{Username: username, Email: email, Password: hash(password)}
		v, err := sqlhelper.Insert(&user)
		if err != nil {
			session.LogErr(err)
			json(ctx, models.FAIL, "", nil)
		}

		lastUser := v.(datamodels.User)
		insStr := strconv.Itoa(lastUser.ID)

		dir, _ := os.Getwd()
		userPath := dir + "/public/users/" + insStr

		dirErr := os.Mkdir(userPath, 0655)
		session.LogErr(dirErr)

		linkErr := os.Link(dir+"/public/images/golang.png", userPath+"/avatar.png")
		session.LogErr(linkErr)

		session.SetSession(ctx, "id", lastUser.ID)
		session.SetSession(ctx, "username", username)

		response.Msg = "Hello, " + username + "!!"
		response.Code = models.SUCCESS

	}
	json(ctx, response.Code, response.Msg, nil)
}

// UserLogin function to log user in
func UserLogin(ctx iris.Context) {

	rusername := ctx.PostValueTrim("username")
	rpassword := ctx.PostValueTrim("password")

	var (
		response models.JsonResponse
	)

	response.Code = models.FAIL
	user := datamodels.User{}
	sqlhelper.SelectOne(&user, "username=?", rusername)

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(rpassword))
	fmt.Println(err)
	if rusername == "" || rpassword == "" {
		response.Msg = "Some values are missing!!"
	} else if err != nil {
		response.Msg = "Invalid username!!"
	} else if err != nil {
		response.Msg = "Invalid password!!"
	} else {
		session.SetSession(ctx, "id", user.ID)
		session.SetSession(ctx, "username", user.Username)

		response.Msg = "Hello, " + user.Username + "!!"
		response.Code = models.SUCCESS
	}
	json(ctx, response.Code, response.Msg, nil)
}
