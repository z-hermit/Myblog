package routes

import (
	CO "github.com/iris-contrib/Iris-Mini-Social-Network/config"
	"os"
	"strconv"
	"time"

	"fmt"
	"github.com/badoux/checkmail"
	"github.com/kataras/iris"
	"golang.org/x/crypto/bcrypt"
	"mywork.com/Myblog/server/domain/models"
	"mywork.com/Myblog/server/infrastructure"
)

// Logout route
func Logout(ctx iris.Context) {
	loggedIn(ctx, "")
	session := CO.GetSession(ctx)
	session.Destroy()
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
	infrastructure.SelectOne("COUNT(id) AS userCount", "User", "Username", username).Scan(&userCount)
	infrastructure.SelectOne("COUNT(id) AS emailCount", "User", "Email", email).Scan(&emailCount)

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

		rs, err := infrastructure.Insert("User", username, email, hash(password), time.Now())
		CO.Err(err)
		insertID, _ := rs.LastInsertId()
		insStr := strconv.FormatInt(insertID, 10)

		dir, _ := os.Getwd()
		userPath := dir + "/public/users/" + insStr

		dirErr := os.Mkdir(userPath, 0655)
		CO.Err(dirErr)

		linkErr := os.Link(dir+"/public/images/golang.png", userPath+"/avatar.png")
		CO.Err(linkErr)

		session := CO.GetSession(ctx)
		session.Set("id", insStr)
		session.Set("username", username)

		response.Msg = "Hello, " + username + "!!"
		response.Code = models.SUCCESS

	}
	json(ctx, response)
}

// UserLogin function to log user in
func UserLogin(ctx iris.Context) {

	rusername := ctx.PostValueTrim("username")
	rpassword := ctx.PostValueTrim("password")

	var (
		id       int
		username string
		password string
		response models.JsonResponse
	)

	response.Code = models.FAIL

	infrastructure.SelectOne("id, username, password", "User", "Username", rusername).Scan(&id, &username, &password)

	err := bcrypt.CompareHashAndPassword([]byte(password), []byte(rpassword))
	fmt.Println(err)
	if rusername == "" || rpassword == "" {
		response.Msg = "Some values are missing!!"
	} else if err != nil {
		response.Msg = "Invalid username!!"
	} else if err != nil {
		response.Msg = "Invalid password!!"
	} else {
		session := CO.GetSession(ctx)
		session.Set("id", strconv.Itoa(id))
		session.Set("username", username)

		response.Msg = "Hello, " + username + "!!"
		response.Code = models.SUCCESS
	}
	json(ctx, response)
}
